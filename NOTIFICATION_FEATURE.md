# Notification Feature Documentation

## Overview
The notification system allows admins to create and broadcast notifications to users. Users can view notifications in real-time through a notification bell icon in the navbar.

## Features Implemented

### 1. Notification Bell Component (`NotificationBell.jsx`)
- **Location**: `client/src/components/NotificationBell.jsx`
- **Features**:
  - Bell icon with unread count badge
  - Dropdown showing all notifications
  - Real-time notification fetching (polls every 30 seconds)
  - Mark individual notifications as read
  - Mark all notifications as read
  - Visual indicators for unread notifications
  - Priority badges (urgent, high, medium, low)
  - Type-based icons (success, warning, error, info, announcement)
  - Time ago formatting
  - Responsive design with theme support

### 2. Navbar Integration
- **Location**: `client/src/components/Navbar.jsx`
- **Changes**:
  - Added `NotificationBell` component import
  - Integrated notification bell in the navbar (only visible when authenticated)
  - Positioned between mobile menu toggle and user menu

### 3. Backend API Endpoints
All endpoints are already implemented in `server/Routes/notificationRouter.js`:

#### User Endpoints:
- `GET /notifications/my-notifications` - Get all notifications for current user
- `PATCH /notifications/mark-read/:id` - Mark a notification as read
- `PATCH /notifications/mark-all-read` - Mark all notifications as read

#### Admin Endpoints:
- `POST /notifications/create` - Create a new notification
- `GET /notifications/all` - Get all notifications (with pagination)
- `PUT /notifications/update/:id` - Update a notification
- `DELETE /notifications/delete/:id` - Delete a notification
- `GET /notifications/stats` - Get notification statistics

### 4. Admin Panel Integration
- **Location**: `client/src/pages/Admin.jsx`
- **Features**:
  - Notification management module already exists
  - Admins can create, edit, and delete notifications
  - View notification statistics
  - Target specific audiences (all, users, admins, content-managers)
  - Set priority levels and expiration dates

## How to Use

### For Users:
1. Log in to the application
2. Look for the bell icon in the navbar (top right)
3. Click the bell to view notifications
4. Unread notifications are highlighted with a blue background
5. Click on a notification to mark it as read
6. Use "Mark all read" button to mark all notifications as read

### For Admins:
1. Log in as an admin
2. Navigate to Admin Panel
3. Click on "Notifications" in the sidebar
4. Create new notifications with:
   - Title and message
   - Type (info, success, warning, error, announcement)
   - Priority (low, medium, high, urgent)
   - Target audience (all, users, admins, content-managers)
   - Optional expiration date
5. Manage existing notifications (edit/delete)

## Notification Schema
```javascript
{
  title: String (required),
  message: String (required),
  type: 'info' | 'success' | 'warning' | 'error' | 'announcement',
  priority: 'low' | 'medium' | 'high' | 'urgent',
  targetAudience: 'all' | 'users' | 'admins' | 'content-managers',
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

## API Examples

### Create Notification (Admin)
```javascript
POST http://localhost:3000/notifications/create
Headers: {
  Authorization: Bearer <token>
}
Body: {
  "title": "System Maintenance",
  "message": "The system will be under maintenance on Sunday",
  "type": "warning",
  "priority": "high",
  "targetAudience": "all"
}
```

### Get User Notifications
```javascript
GET http://localhost:3000/notifications/my-notifications
Headers: {
  Authorization: Bearer <token>
}
```

### Mark Notification as Read
```javascript
PATCH http://localhost:3000/notifications/mark-read/:notificationId
Headers: {
  Authorization: Bearer <token>
}
```

## Testing

1. **Start the server**:
   ```bash
   cd server
   npm start
   ```

2. **Start the client**:
   ```bash
   cd client
   npm run dev
   ```

3. **Test as Admin**:
   - Log in as admin
   - Go to Admin Panel → Notifications
   - Create a test notification
   - Check the bell icon for the new notification

4. **Test as User**:
   - Log in as a regular user
   - Check the bell icon in navbar
   - Click to view notifications
   - Mark notifications as read

## Styling
- Fully responsive design
- Dark/Light theme support
- Smooth animations and transitions
- Consistent with existing UI design patterns
- Accessible with proper ARIA labels

## Future Enhancements
- Push notifications (browser notifications API)
- Email notifications
- Notification preferences per user
- Notification categories/filters
- Notification sound alerts
- Rich text formatting in messages
- Attachment support
