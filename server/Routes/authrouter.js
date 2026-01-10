import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import userModel from "../models/userSchema.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

// Email transporter setup - Multiple configuration attempts
let transporter;
let emailWorking = false;

const createEmailTransporter = async () => {
  console.log('Setting up email transporter...');
  
  // Configuration 1: Simple Gmail service (most reliable)
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Test the connection
    await transporter.verify();
    console.log('✅ Email configuration successful - Gmail service');
    emailWorking = true;
    return;
    
  } catch (error) {
    console.log('Gmail service config failed:', error.message);
  }
  
  // Configuration 2: SMTP with explicit settings
  try {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    await transporter.verify();
    console.log('Email configuration successful - SMTP explicit');
    emailWorking = true;
    return;
    
  } catch (error) {
    console.log('SMTP explicit config failed:', error.message);
  }
  
  // Configuration 3: Secure SMTP
  try {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    await transporter.verify();
    console.log('✅ Email configuration successful - Secure SMTP');
    emailWorking = true;
    return;
    
  } catch (error) {
    console.log('❌ Secure SMTP config failed:', error.message);
  }
  
  console.log('⚠️ All email configurations failed. Using development mode.');
  console.log('📧 OTPs will be logged to console for testing.');
};

// Initialize email transporter
createEmailTransporter().catch(console.error);

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP endpoint
router.post("/send-otp", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required"
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

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with expiration (5 minutes)
    otpStore.set(email, {
      otp,
      name,
      timestamp: Date.now(),
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // For development: Log OTP to console if email fails
    console.log(`\n=== DEVELOPMENT OTP ===`);
    console.log(`Email: ${email}`);
    console.log(`OTP: ${otp}`);
    console.log(`======================\n`);

    // Send OTP email
    const mailOptions = {
      from: `"Skill Sync" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Skill Sync - Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">Welcome to Skill Sync!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for signing up! Please use the following OTP to verify your email address:</p>
          <div style="background-color: #F3F4F6; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #1F2937; font-size: 32px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in 5 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>Skill Sync Team</p>
        </div>
      `
    };

    // Send email with comprehensive error handling
    console.log(`\n📧 Sending OTP to: ${email}`);
    console.log(`🔑 Generated OTP: ${otp}`);
    console.log(`📝 User Name: ${name}`);
    
    if (emailWorking && transporter) {
      try {
        console.log('📤 Attempting to send email...');
        
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully!');
        console.log('📬 Message ID:', info.messageId);
        
        res.status(200).json({
          success: true,
          message: "OTP sent successfully to your email"
        });
        return;
        
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError.message);
        console.error("🔍 Error details:", emailError);
      }
    }
    
    // Fallback: Always allow development mode
    console.log('🔧 Using development mode - OTP logged above');
    res.status(200).json({
      success: true,
      message: "OTP generated successfully. Check server console for the OTP code."
    });

  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again."
    });
  }
});

// Verify OTP and create user
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and password are required"
      });
    }

    // Check if OTP exists and is valid
    const storedData = otpStore.get(email);
    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired"
      });
    }

    // Check if OTP is expired
    if (Date.now() > storedData.expires) {
      otpStore.delete(email);
      return res.status(400).json({
        success: false,
        message: "OTP has expired"
      });
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new userModel({
      name: storedData.name,
      email,
      password: hashedPassword,
      role: 'user',
      isActive: true,
      emailVerified: true
    });

    await newUser.save();

    // Remove OTP from store
    otpStore.delete(email);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (excluding password)
    const userData = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive,
      emailVerified: newUser.emailVerified
    };

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: userData,
      token
    });

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create account. Please try again."
    });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

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

    // Check if user is active
    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: "Your account has been deactivated. Please contact support."
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (excluding password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userData,
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again."
    });
  }
});

// Refresh session endpoint
router.post("/refresh-session", auth, async (req, res) => {
  try {
    // If we reach here, the auth middleware has validated the token
    const user = await userModel.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: "Account is deactivated"
      });
    }

    // Generate new token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified
    };

    res.status(200).json({
      success: true,
      message: "Session refreshed successfully",
      user: userData,
      token
    });

  } catch (error) {
    console.error("Refresh session error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to refresh session"
    });
  }
});

// Create admin endpoint (for initial setup)
router.post("/create-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required"
      });
    }

    // Check if any admin already exists
    const existingAdmin = await userModel.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists"
      });
    }

    // Check if user with this email exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin user
    const adminUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      emailVerified: true
    });

    await adminUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: adminUser._id,
        email: adminUser.email,
        role: adminUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userData = {
      id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
      isActive: adminUser.isActive,
      emailVerified: adminUser.emailVerified
    };

    res.status(201).json({
      success: true,
      message: "Admin account created successfully",
      user: userData,
      token
    });

  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create admin account"
    });
  }
});

// Get current user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified
    };

    res.status(200).json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get user profile"
    });
  }
});

// Test email endpoint (development only)
router.post("/test-email", async (req, res) => {
  try {
    console.log('🧪 Testing email configuration...');
    
    if (!emailWorking || !transporter) {
      return res.status(500).json({
        success: false,
        message: "Email service not configured. Check server logs."
      });
    }
    
    const testMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to self for testing
      subject: 'Skill Sync - Email Test ✅',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">🎉 Email Test Successful!</h2>
          <p>If you receive this email, your email configuration is working correctly.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Server:</strong> Skill Sync Development</p>
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #059669;">✅ Email service is ready for OTP delivery!</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(testMailOptions);
    console.log('✅ Test email sent successfully:', info.messageId);
    
    res.status(200).json({
      success: true,
      message: "Test email sent successfully! Check your inbox.",
      messageId: info.messageId
    });

  } catch (error) {
    console.error("❌ Test email failed:", error);
    res.status(500).json({
      success: false,
      message: "Test email failed: " + error.message
    });
  }
});

export default router;