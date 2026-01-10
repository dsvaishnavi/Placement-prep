import express from "express";
import userModel from "../models/userSchema.js";
import auth, { requireAdmin, requireModerator } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(auth);

// Get all users (Admin/Moderator only)
router.get("/users", requireModerator, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '' } = req.query;
    
    // Build search query
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) {
      query.role = role;
    }

    const users = await userModel
      .find(query)
      .select('-password -otp -otpExpires')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await userModel.countDocuments(query);

    res.json({
      success: true,
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error fetching users" 
    });
  }
});

// Get user statistics (Admin/Moderator only)
router.get("/stats", requireModerator, async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const activeUsers = await userModel.countDocuments({ isActive: true });
    const verifiedUsers = await userModel.countDocuments({ emailverified: true });
    const adminUsers = await userModel.countDocuments({ role: 'admin' });
    const moderatorUsers = await userModel.countDocuments({ role: 'moderator' });
    
    // Users registered in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentUsers = await userModel.countDocuments({ 
      createdAt: { $gte: thirtyDaysAgo } 
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        verifiedUsers,
        adminUsers,
        moderatorUsers,
        recentUsers,
        inactiveUsers: totalUsers - activeUsers,
        unverifiedUsers: totalUsers - verifiedUsers
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error fetching statistics" 
    });
  }
});

// Update user role (Admin only)
router.put("/users/:userId/role", requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'admin', 'moderator'].includes(role)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid role" 
      });
    }

    // Prevent admin from demoting themselves
    if (userId === req.user._id.toString() && role !== 'admin') {
      return res.status(400).json({ 
        success: false, 
        message: "Cannot change your own admin role" 
      });
    }

    const user = await userModel.findByIdAndUpdate(
      userId, 
      { role }, 
      { new: true }
    ).select('-password -otp -otpExpires');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.json({
      success: true,
      message: "User role updated successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error updating user role" 
    });
  }
});

// Toggle user active status (Admin/Moderator only)
router.put("/users/:userId/status", requireModerator, async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    // Prevent admin from deactivating themselves
    if (userId === req.user._id.toString() && !isActive) {
      return res.status(400).json({ 
        success: false, 
        message: "Cannot deactivate your own account" 
      });
    }

    const user = await userModel.findByIdAndUpdate(
      userId, 
      { isActive }, 
      { new: true }
    ).select('-password -otp -otpExpires');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error updating user status" 
    });
  }
});

// Delete user (Admin only)
router.delete("/users/:userId", requireAdmin, async (req, res) => {
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

    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error deleting user" 
    });
  }
});

// Get current user profile
router.get("/profile", async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error fetching profile" 
    });
  }
});

export default router;