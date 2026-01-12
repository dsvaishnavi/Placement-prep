import express from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/userSchema.js";
import auth, { requireAdmin, requireContentManager, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Get all users (Admin only)
router.get("/users", auth, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '' } = req.query;
    
    // Build search query
    const searchQuery = {};
    if (search) {
      searchQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) {
      searchQuery.role = role;
    }

    const users = await userModel
      .find(searchQuery)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await userModel.countDocuments(searchQuery);

    res.status(200).json({
      success: true,
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
});

// Get platform statistics (Admin and Content Manager)
router.get("/stats", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const activeUsers = await userModel.countDocuments({ isActive: true });
    const adminUsers = await userModel.countDocuments({ role: 'admin' });
    const contentManagers = await userModel.countDocuments({ role: 'content-manager' });
    const regularUsers = await userModel.countDocuments({ role: 'user' });

    // Mock data for other statistics (replace with actual models when available)
    const stats = {
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
        byRole: {
          admin: adminUsers,
          contentManager: contentManagers,
          user: regularUsers
        }
      },
      content: {
        // These would come from actual content models
        aptitudeQuestions: 856,
        coreConcepts: 124,
        publishedContent: 642,
        draftContent: 187
      },
      engagement: {
        // Mock engagement data
        averageScore: 72,
        testsCompleted: 1248,
        studyHours: 3456
      }
    };

    res.status(200).json({
      success: true,
      stats
    });

  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics"
    });
  }
});

// Get recent user activity (Admin and Content Manager)
router.get("/recent-activity", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Get recently registered users
    const recentRegistrations = await userModel
      .find({})
      .select('name email role createdAt')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit) / 2);

    // Get recently active users (based on lastLogin)
    const recentLogins = await userModel
      .find({ lastLogin: { $ne: null } })
      .select('name email role lastLogin')
      .sort({ lastLogin: -1 })
      .limit(parseInt(limit) / 2);

    // Combine and format activities
    const activities = [];

    // Add registration activities
    recentRegistrations.forEach(user => {
      activities.push({
        id: `reg_${user._id}`,
        type: 'registration',
        user: {
          name: user.name,
          email: user.email,
          role: user.role
        },
        timestamp: user.createdAt,
        description: `New ${user.role} account created`
      });
    });

    // Add login activities
    recentLogins.forEach(user => {
      activities.push({
        id: `login_${user._id}`,
        type: 'login',
        user: {
          name: user.name,
          email: user.email,
          role: user.role
        },
        timestamp: user.lastLogin,
        description: `User logged in`
      });
    });

    // Sort all activities by timestamp (most recent first)
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Limit to requested number
    const limitedActivities = activities.slice(0, parseInt(limit));

    res.status(200).json({
      success: true,
      activities: limitedActivities
    });

  } catch (error) {
    console.error("Get recent activity error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recent activity"
    });
  }
});

// Update user role (Admin only)
router.put("/users/:userId/role", auth, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'admin', 'content-manager'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified"
      });
    }

    // Prevent admin from changing their own role
    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot change your own role"
      });
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user
    });

  } catch (error) {
    console.error("Update user role error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user role"
    });
  }
});

// Update user status (Admin only)
router.put("/users/:userId/status", auth, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    // Prevent admin from deactivating themselves
    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot change your own status"
      });
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user
    });

  } catch (error) {
    console.error("Update user status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user status"
    });
  }
});

// Delete user (Admin only)
router.delete("/users/:userId", auth, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    // Prevent admin from deleting themselves
    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete your own account"
      });
    }

    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user"
    });
  }
});

// Get single user details (Admin only)
router.get("/users/:userId", auth, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user details"
    });
  }
});

// Update user details (Admin only)
router.put("/users/:userId", auth, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required"
      });
    }

    if (role && !['user', 'admin', 'content-manager'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified"
      });
    }

    // Prevent admin from changing their own role
    if (userId === req.user._id.toString() && role && role !== req.user.role) {
      return res.status(400).json({
        success: false,
        message: "Cannot change your own role"
      });
    }

    // Check if email is already taken by another user
    if (email !== req.user.email) {
      const existingUser = await userModel.findOne({ 
        email, 
        _id: { $ne: userId } 
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email is already taken by another user"
        });
      }
    }

    const updateData = { name, email };
    if (role) {
      updateData.role = role;
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user
    });

  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user"
    });
  }
});

// Export users data (Admin only)
router.get("/users/export/csv", auth, requireAdmin, async (req, res) => {
  try {
    const users = await userModel.find({}).select('-password').sort({ createdAt: -1 });

    // Create CSV content
    const csvHeader = 'Name,Email,Role,Status,Registration Date,Last Login,Email Verified\n';
    const csvRows = users.map(user => {
      const registrationDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A';
      const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never';
      const status = user.isActive ? 'Active' : 'Inactive';
      const emailVerified = user.emailverified ? 'Yes' : 'No';
      
      return `"${user.name}","${user.email}","${user.role}","${status}","${registrationDate}","${lastLogin}","${emailVerified}"`;
    }).join('\n');

    const csvContent = csvHeader + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="users_export_${new Date().toISOString().split('T')[0]}.csv"`);
    res.status(200).send(csvContent);

  } catch (error) {
    console.error("Export users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export users data"
    });
  }
});

// Create new user (Admin only)
router.post("/users", auth, requireAdmin, async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required"
      });
    }

    if (!['user', 'admin', 'content-manager'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified"
      });
    }

    // Check if user already exists
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

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
      isActive: true,
      emailverified: true
    });

    await newUser.save();

    // Return user data (excluding password)
    const userData = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive,
      emailverified: newUser.emailverified,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userData
    });

  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create user"
    });
  }
});

export default router;