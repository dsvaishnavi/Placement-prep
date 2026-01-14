# Notification System Documentation

## Overview
A complete notification system has been implemented for the admin panel, allowing administrators to create, manage, and send notifications to users.

## Features

### Admin Features (Admin Only)
- **Create Notifications**: Send notifications to specific user groups
- **Manage Notifications**: Edit, delete, and view all notifications
- **Target Audiences**: 
  - All Users
  - Students Only
  - Admins Only
  - Content Managers Only
- **Notification Types**: Info, Success, Warning, Error, Announcement
- **Priority Levels**: Low, Medium, High, Urgent
- **Expiration**: Set optional expiration dates for notifications
- **Statistics Dashboard**: View notification metrics and analytics

### User Features (All Users)
- **View Notifications**: See all relevant notifications in the bell icon dropdown
- **Unread Count**: Visual indicator showing number of unread notifications
- **Mark as Read**: Click on notifications to mark them as read
- **Mark All as Read**: Bulk action to mark all notifications as read
- **Real-time Updates**: Notifications refresh every 30 seconds
- **Time Stamps**: See when notifications were created

## API Endpoints

### User Endpoints (Authenticated)
- `GET /notifications/my-notifications` - Get all notifications for current user
- `PATCH /notifications/mark-read/:id` - Mark a notification as read
- `PATCH /notifications/mark-all-read` - Mark all notifications as read

### Admin Endpoints (Admin Only)
- `POST /notifications/create` - Create a new notification
- `GET /notifications/all` - Get all notifications with pagination
- `PUT /notifications/update/:id` - Update a notification
- `DELETE /notifications/delete/:id` - Delete a notification
- `GET /notifications/stats` - Get notification statistics

## Database Schema

### Notification Model
```javascript
{
  title: String (required),
  message: String (required),
  type: String (enum: info, success, warning, error, announcement),
  priority: String (enum: low, medium, high, urgent),
  targetAudience: String (enum: all, users, admins, content-managers),
  recipients: [{
    userId: ObjectId,
    read: Boolean,
    readAt: Date
  }],
  createdBy: ObjectId (required),
  expiresAt: Date (optional),
  isActive: Boolean,
  timestamps: true
}
```

## Usage

### For Admins

1. **Access Notification Management**
   - Navigate to Admin Panel
   - Click on "Notifications" in the sidebar
   - Only visible to administrators

2. **Create a Notification**
   - Click "Create Notification" button
   - Fill in the form:
     - Title (required)
     - Message (required)
     - Type (info, success, warning, error, announcement)
     - Priority (low, medium, high, urgent)
     - Target Audience (all, users, admins, content-managers)
     - Expiration Date (optional)
   - Click "Create Notification"

3. **Manage Notifications**
   - View all notifications in the list
   - Edit: Click the edit icon to modify a notification
   - Delete: Click the trash icon to remove a notification
   - View statistics in the dashboard cards

### For All Users

1. **View Notifications**
   - Click the bell icon in the top navigation
   - See unread count badge if there are unread notifications
   - Notifications are sorted by newest first

2. **Read Notifications**
   - Click on any notification to mark it as read
   - Click "Mark all read" to mark all as read at once
   - Unread notifications have a blue background and dot indicator

3. **Access Notification Management (Admins Only)**
   - Click "Manage notifications" at the bottom of the dropdown
   - This will navigate to the full notification management interface

## Components

### Client-Side
- `NotificationManagement.jsx` - Admin interface for managing notifications
- `Admin.jsx` - Updated with notification dropdown and integration

### Server-Side
- `notificationSchema.js` - MongoDB schema for notifications
- `notificationRouter.js` - API routes for notification operations
- `auth.js` - Middleware with `requireAdmin` for admin-only routes

## Security

- All notification endpoints require authentication
- Admin-only endpoints are protected with `requireAdmin` middleware
- Users can only see notifications targeted to them or their role
- Notifications are filtered by target audience and expiration date

## Future Enhancements

Potential improvements:
- Push notifications (browser notifications)
- Email notifications
- In-app notification sound/animation
- Notification preferences per user
- Scheduled notifications
- Rich text formatting in messages
- Notification templates
- Bulk notification actions
- Notification history/archive
