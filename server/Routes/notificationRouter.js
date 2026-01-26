import express from "express";
import notificationModel from "../models/notificationSchema.js";
import userModel from "../models/userSchema.js";
import auth, { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get all notifications for current user
router.get("/my-notifications", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const notifications = await notificationModel.find({
      $and: [
        {
          $or: [
            { 'recipients.userId': userId },
            { targetAudience: 'all' },
            { targetAudience: req.user.role === 'admin' ? 'admins' : req.user.role === 'content-manager' ? 'content-managers' : 'users' }
          ]
        },
        { isActive: true },
        {
          $or: [
            { expiresAt: null },
            { expiresAt: { $gt: new Date() } }
          ]
        }
      ]
    })
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 })
    .limit(50);

    // Map notifications with read status
    const notificationsWithStatus = notifications.map(notif => {
      const recipient = notif.recipients.find(r => r.userId.toString() === userId.toString());
      return {
        id: notif._id,
        title: notif.title,
        message: notif.message,
        type: notif.type,
        priority: notif.priority,
        targetAudience: notif.targetAudience,
        createdBy: notif.createdBy,
        createdAt: notif.createdAt,
        expiresAt: notif.expiresAt,
        read: recipient ? recipient.read : false,
        readAt: recipient ? recipient.readAt : null
      };
    });

    // Count unread notifications
    const unreadCount = notificationsWithStatus.filter(n => !n.read).length;

    res.status(200).json({
      success: true,
      notifications: notificationsWithStatus,
      unreadCount
    });

  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications"
    });
  }
});

// Mark notification as read
router.patch("/mark-read/:id", auth, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user._id;

    const notification = await notificationModel.findById(notificationId);
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    // Find or create recipient entry
    const recipientIndex = notification.recipients.findIndex(
      r => r.userId.toString() === userId.toString()
    );

    if (recipientIndex >= 0) {
      notification.recipients[recipientIndex].read = true;
      notification.recipients[recipientIndex].readAt = new Date();
    } else {
      notification.recipients.push({
        userId,
        read: true,
        readAt: new Date()
      });
    }

    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read"
    });

  } catch (error) {
    console.error("Mark read error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark notification as read"
    });
  }
});

// Mark all notifications as read
router.patch("/mark-all-read", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await notificationModel.find({
      $or: [
        { 'recipients.userId': userId },
        { targetAudience: 'all' },
        { targetAudience: req.user.role === 'admin' ? 'admins' : req.user.role === 'content-manager' ? 'content-managers' : 'users' }
      ],
      isActive: true
    });

    for (const notification of notifications) {
      const recipientIndex = notification.recipients.findIndex(
        r => r.userId.toString() === userId.toString()
      );

      if (recipientIndex >= 0) {
        notification.recipients[recipientIndex].read = true;
        notification.recipients[recipientIndex].readAt = new Date();
      } else {
        notification.recipients.push({
          userId,
          read: true,
          readAt: new Date()
        });
      }

      await notification.save();
    }

    res.status(200).json({
      success: true,
      message: "All notifications marked as read"
    });

  } catch (error) {
    console.error("Mark all read error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark all notifications as read"
    });
  }
});

// ===== ADMIN ONLY ROUTES =====

// Create notification (Admin only)
router.post("/create", auth, requireAdmin, async (req, res) => {
  try {
    console.log('=== CREATE NOTIFICATION REQUEST ===');
    console.log('User:', req.user.email, 'Role:', req.user.role);
    console.log('Body:', req.body);
    
    const { title, message, type, priority, targetAudience, expiresAt } = req.body;

    if (!title || !message) {
      console.log('Validation failed: Missing title or message');
      return res.status(400).json({
        success: false,
        message: "Title and message are required"
      });
    }

    const notification = new notificationModel({
      title,
      message,
      type: type || 'info',
      priority: priority || 'medium',
      targetAudience: targetAudience || 'all',
      createdBy: req.user._id,
      expiresAt: expiresAt || null,
      isActive: true
    });

    await notification.save();
    console.log('Notification created successfully:', notification._id);

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification
    });

  } catch (error) {
    console.error("Create notification error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create notification: " + error.message
    });
  }
});

// Get all notifications (Admin only)
router.get("/all", auth, requireAdmin, async (req, res) => {
  try {
    console.log('=== GET ALL NOTIFICATIONS REQUEST ===');
    console.log('User:', req.user.email, 'Role:', req.user.role);
    
    const { page = 1, limit = 20, type, targetAudience, isActive } = req.query;

    const query = {};
    if (type) query.type = type;
    if (targetAudience) query.targetAudience = targetAudience;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    console.log('Query:', query);

    const notifications = await notificationModel.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await notificationModel.countDocuments(query);

    console.log('Found notifications:', notifications.length, 'Total:', count);

    res.status(200).json({
      success: true,
      notifications,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });

  } catch (error) {
    console.error("Get all notifications error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications: " + error.message
    });
  }
});

// Update notification (Admin only)
router.put("/update/:id", auth, requireAdmin, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const { title, message, type, priority, targetAudience, expiresAt, isActive } = req.body;

    const notification = await notificationModel.findById(notificationId);
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    if (title) notification.title = title;
    if (message) notification.message = message;
    if (type) notification.type = type;
    if (priority) notification.priority = priority;
    if (targetAudience) notification.targetAudience = targetAudience;
    if (expiresAt !== undefined) notification.expiresAt = expiresAt;
    if (isActive !== undefined) notification.isActive = isActive;

    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification updated successfully",
      notification
    });

  } catch (error) {
    console.error("Update notification error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update notification"
    });
  }
});

// Delete notification (Admin only)
router.delete("/delete/:id", auth, requireAdmin, async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await notificationModel.findByIdAndDelete(notificationId);
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully"
    });

  } catch (error) {
    console.error("Delete notification error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete notification"
    });
  }
});

// Get notification statistics (Admin only)
router.get("/stats", auth, requireAdmin, async (req, res) => {
  try {
    const totalNotifications = await notificationModel.countDocuments();
    const activeNotifications = await notificationModel.countDocuments({ isActive: true });
    const expiredNotifications = await notificationModel.countDocuments({
      expiresAt: { $lt: new Date() }
    });

    const notificationsByType = await notificationModel.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    const notificationsByAudience = await notificationModel.aggregate([
      { $group: { _id: '$targetAudience', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        total: totalNotifications,
        active: activeNotifications,
        expired: expiredNotifications,
        byType: notificationsByType,
        byAudience: notificationsByAudience
      }
    });

  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notification statistics"
    });
  }
});

export default router;
