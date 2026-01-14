# Testing the Notification System

## Prerequisites
1. Server is running on `http://localhost:3000`
2. Client is running on `http://localhost:5173`
3. You have an admin account created

## Step-by-Step Testing Guide

### 1. Start the Server
```bash
cd server
npm start
```

### 2. Start the Client
```bash
cd client
npm run dev
```

### 3. Login as Admin
1. Navigate to `http://localhost:5173/login`
2. Login with admin credentials
3. Navigate to the admin panel

### 4. Test Notification Bell Icon (All Users)

#### View Notifications
1. Look at the top navigation bar
2. Find the bell icon (🔔) next to the theme toggle
3. Click on the bell icon
4. You should see a dropdown with:
   - "Notifications" header
   - List of notifications (or "No notifications" if empty)
   - Unread count (if any)
   - "Mark all read" button (if there are unread notifications)
   - "Manage notifications" button (admin only)

#### Test Notification Features
1. **Unread Badge**: If there are unread notifications, you'll see a red dot on the bell icon
2. **Click Notification**: Click on any unread notification to mark it as read
3. **Mark All Read**: Click "Mark all read" to mark all notifications as read
4. **Time Stamps**: Each notification shows how long ago it was created
5. **Type Badges**: Notifications show their type (info, success, warning, error)

### 5. Test Notification Management (Admin Only)

#### Access Notification Management
1. Click on "Notifications" in the sidebar (only visible to admins)
2. You should see the Notification Management interface with:
   - Statistics cards (Total, Active, Expired, Audiences)
   - List of all notifications
   - "Create Notification" button

#### Create a New Notification
1. Click "Create Notification" button
2. Fill in the form:
   - **Title**: "Welcome to the Platform"
   - **Message**: "Thank you for joining our learning platform!"
   - **Type**: Select "announcement"
   - **Priority**: Select "medium"
   - **Target Audience**: Select "all"
   - **Expires At**: Leave empty or set a future date
3. Click "Create Notification"
4. You should see a success toast message
5. The notification should appear in the list

#### Edit a Notification
1. Find a notification in the list
2. Click the edit icon (pencil)
3. Modify any fields
4. Click "Update Notification"
5. Changes should be reflected immediately

#### Delete a Notification
1. Find a notification in the list
2. Click the delete icon (trash)
3. Confirm the deletion
4. Notification should be removed from the list

#### View Statistics
1. Check the statistics cards at the top:
   - **Total**: Total number of notifications
   - **Active**: Currently active notifications
   - **Expired**: Notifications past their expiration date
   - **Audiences**: Number of different target audiences

### 6. Test Different User Roles

#### As Admin
1. Login as admin
2. Click bell icon - should see all notifications targeted to "all" or "admins"
3. Should see "Manage notifications" button in dropdown
4. Should see "Notifications" in sidebar

#### As Content Manager (if available)
1. Login as content manager
2. Click bell icon - should see notifications targeted to "all" or "content-managers"
3. Should NOT see "Manage notifications" button
4. Should NOT see "Notifications" in sidebar

#### As Regular User
1. Login as regular user
2. Click bell icon - should see notifications targeted to "all" or "users"
3. Should NOT see "Manage notifications" button
4. Should NOT see "Notifications" in sidebar

### 7. Test Real-time Updates
1. Keep the admin panel open
2. Create a new notification
3. Wait up to 30 seconds
4. The notification should appear in the bell dropdown automatically

### 8. Test Notification Types

Create notifications with different types to see the visual differences:

#### Info Notification
- Type: info
- Color: Blue
- Icon: Info circle

#### Success Notification
- Type: success
- Color: Green
- Icon: Check circle

#### Warning Notification
- Type: warning
- Color: Yellow
- Icon: Alert triangle

#### Error Notification
- Type: error
- Color: Red
- Icon: Alert circle

#### Announcement Notification
- Type: announcement
- Color: Purple
- Icon: Bell

### 9. Test Priority Levels

Create notifications with different priorities:
- **Low**: Standard notification
- **Medium**: Standard notification
- **High**: Important notification
- **Urgent**: Critical notification

### 10. Test Expiration

1. Create a notification with an expiration date in the past
2. It should not appear in user notifications
3. It should appear in the admin list as "expired"

## Expected Results

✅ **Success Indicators:**
- Bell icon shows unread count badge
- Notifications dropdown opens/closes smoothly
- Notifications can be marked as read
- Admin can create, edit, and delete notifications
- Statistics update correctly
- Different user roles see appropriate notifications
- Notifications refresh automatically

❌ **Common Issues:**
- If notifications don't appear, check:
  - Server is running
  - MongoDB is connected
  - User is authenticated (token in localStorage)
  - Target audience matches user role
  - Notification hasn't expired

## API Testing with Postman/Thunder Client

### Get My Notifications
```
GET http://localhost:3000/notifications/my-notifications
Headers:
  Authorization: Bearer YOUR_TOKEN
```

### Create Notification (Admin)
```
POST http://localhost:3000/notifications/create
Headers:
  Authorization: Bearer ADMIN_TOKEN
  Content-Type: application/json
Body:
{
  "title": "Test Notification",
  "message": "This is a test notification",
  "type": "info",
  "priority": "medium",
  "targetAudience": "all"
}
```

### Mark as Read
```
PATCH http://localhost:3000/notifications/mark-read/NOTIFICATION_ID
Headers:
  Authorization: Bearer YOUR_TOKEN
```

### Get All Notifications (Admin)
```
GET http://localhost:3000/notifications/all
Headers:
  Authorization: Bearer ADMIN_TOKEN
```

### Get Statistics (Admin)
```
GET http://localhost:3000/notifications/stats
Headers:
  Authorization: Bearer ADMIN_TOKEN
```

## Troubleshooting

### Notifications Not Showing
1. Check browser console for errors
2. Verify token is valid in localStorage
3. Check server logs for API errors
4. Verify MongoDB connection

### Can't Create Notifications
1. Verify you're logged in as admin
2. Check all required fields are filled
3. Check server logs for validation errors

### Unread Count Not Updating
1. Wait 30 seconds for auto-refresh
2. Refresh the page manually
3. Check if notifications are being marked as read in database

## Success!
If all tests pass, your notification system is working correctly! 🎉
