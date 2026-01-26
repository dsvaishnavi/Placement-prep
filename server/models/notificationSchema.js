import mongoose from "mongoose";
import { Schema } from "mongoose";

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['info', 'success', 'warning', 'error', 'announcement'],
        default: 'info'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    targetAudience: {
        type: String,
        enum: ['all', 'users', 'admins', 'content-managers'],
        default: 'all'
    },
    recipients: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'usersData'
        },
        read: {
            type: Boolean,
            default: false
        },
        readAt: {
            type: Date,
            default: null
        }
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'usersData',
        required: true
    },
    expiresAt: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for efficient queries
notificationSchema.index({ 'recipients.userId': 1, 'recipients.read': 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ expiresAt: 1 });

const notificationModel = mongoose.model("notifications", notificationSchema);

export default notificationModel;
