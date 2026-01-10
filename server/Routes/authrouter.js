import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import userModel from "../models/userSchema.js";

const router = express.Router();

// Email transporter setup
// Get email credentials with fallback
const emailUser = process.env.EMAIL_USER || 'sattudesai007@gmail.com';
const emailPass = process.env.EMAIL_PASS || 'owlxkpioqlbzqxuy';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: emailUser,
    pass: emailPass
  },
  tls: {
    rejectUnauthorized: false
  }
});

console.log('📧 Email transporter configured for Gmail SMTP');

// Temporary storage for OTP verification (in production, use Redis or similar)
const otpStorage = new Map();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: `"Skill Sync" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verif Your Email - Skill Sync',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Skill Sync!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for signing up! Please verify your email address using the OTP below:</p>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #2563eb; font-size: 32px; margin: 0;">${otp}</h1>
        </div>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't create an account, please ignore this email.</p>
        <p>Best regards,<br>Skill Sync Team</p>
      </div>
    `,
    text: `Welcome to Skill Sync! Your verification OTP is: ${otp}. This OTP will expire in 10 minutes.`
  };

  try {
    console.log(`📧 Attempting to send email to ${email}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${email}. Message ID: ${info.messageId}`);
    return { success: true, method: 'email', messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    
    // Provide specific error messages
    if (error.code === 'EAUTH') {
      throw new Error('Gmail authentication failed. Please check your email credentials and app password.');
    } else if (error.code === 'ENOTFOUND') {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }
};

// Send OTP route
router.post("/send-otp", async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and name are required" 
      });
    }

    // Check if user already exists and is verified
    const existingUser = await userModel.findOne({ email });
    if (existingUser && existingUser.emailverified) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists with this email" 
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP data temporarily (not in database yet)
    otpStorage.set(email, {
      name,
      otp,
      otpExpires,
      timestamp: Date.now()
    });

    // Clean up expired OTPs
    for (const [key, value] of otpStorage.entries()) {
      if (new Date() > value.otpExpires) {
        otpStorage.delete(key);
      }
    }

    // Send OTP email
    try {
      const emailResult = await sendOTPEmail(email, otp, name);
      
      res.status(200).json({
        success: true,
        message: "OTP sent to your email address successfully! Please check your inbox."
      });
    } catch (emailError) {
      // Clean up temporary storage if email fails
      otpStorage.delete(email);
      
      return res.status(500).json({ 
        success: false, 
        message: emailError.message
      });
    }

  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

// Verify OTP and complete signup
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email, OTP, and password are required" 
      });
    }

    // Get OTP data from temporary storage
    const otpData = otpStorage.get(email);
    if (!otpData) {
      return res.status(400).json({ 
        success: false, 
        message: "OTP not found or expired. Please request a new OTP." 
      });
    }

    // Check OTP
    if (otpData.otp !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid OTP" 
      });
    }

    // Check OTP expiry
    if (new Date() > otpData.otpExpires) {
      otpStorage.delete(email); // Clean up expired OTP
      return res.status(400).json({ 
        success: false, 
        message: "OTP has expired. Please request a new OTP." 
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser && existingUser.emailverified) {
      otpStorage.delete(email); // Clean up
      return res.status(400).json({ 
        success: false, 
        message: "User already exists with this email" 
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create or update user in database
    let user;
    if (existingUser) {
      // Update existing unverified user
      existingUser.name = otpData.name;
      existingUser.password = hashedPassword;
      existingUser.emailverified = true;
      existingUser.otp = null;
      existingUser.otpExpires = null;
      user = await existingUser.save();
    } else {
      // Create new user
      user = new userModel({
        name: otpData.name,
        email,
        password: hashedPassword,
        emailverified: true
      });
      await user.save();
    }

    // Clean up temporary storage
    otpStorage.delete(email);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "Email verified and account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailverified: user.emailverified,
        isActive: user.isActive
      }
    });

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required" 
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid email or password" 
      });
    }

    // Check if email is verified
    if (!user.emailverified) {
      return res.status(400).json({ 
        success: false, 
        message: "Please verify your email first" 
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid email or password" 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailverified: user.emailverified,
        isActive: user.isActive,
        lastLogin: user.lastLogin
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

// Create first admin user (only if no admin exists)
router.post("/create-admin", async (req, res) => {
  try {
    const { name, email, password, adminKey } = req.body;

    // Check admin key (simple security measure)
    if (adminKey !== 'SKILL_SYNC_ADMIN_2024') {
      return res.status(403).json({ 
        success: false, 
        message: "Invalid admin key" 
      });
    }

    // Check if any admin already exists
    const existingAdmin = await userModel.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ 
        success: false, 
        message: "Admin user already exists" 
      });
    }

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists with this email" 
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin user
    const adminUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      emailverified: true, // Auto-verify admin
      isActive: true
    });

    await adminUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: adminUser._id, email: adminUser.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "Admin user created successfully",
      token,
      user: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        emailverified: adminUser.emailverified,
        isActive: adminUser.isActive
      }
    });

  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

// Test routes (keep for testing)
router.get("/signup", (req, res) => {
  res.send("signup page welcome");
});

router.get("/login", (req, res) => {
  res.send("login page welcome");
});

export default router;
