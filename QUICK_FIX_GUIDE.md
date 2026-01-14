# Quick Fix Guide for Notification System

## Problem
The notification button is not working and created notifications are not being sent.

## Quick Test

### Step 1: Add Test Component to Admin Panel

Open `client/src/pages/Admin.jsx` and temporarily add the test component:

1. Add import at the top:
```javascript
import NotificationTest from '../components/NotificationTest'
```

2. Add a new case in the `renderContent()` function:
```javascript
case 'test':
  return <NotificationTest />
```

3. Add to the modules array:
```javascript
{ id: 'test', label: 'API Test', icon: Settings, color: 'gray' }
```

4. Click on "API Test" in the sidebar and test the buttons

### Step 2: Check What's Happening

Click each button and check:
1. **Browser Console** - Look for any errors
2. **Network Tab** - Check if requests are being sent
3. **Server Console** - Check if requests are being received

### Step 3: Common Fixes

#### Fix 1: Server Not Running
```bash
cd server
npm start
```

#### Fix 2: MongoDB Not Connected
Check your `.env` file in the server folder:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### Fix 3: Not Logged in as Admin
1. Open browser console
2. Type: `localStorage.getItem('token')`
3. If null, you need to login
4. If present, check your user role in MongoDB

#### Fix 4: CORS Issue
The server.js already has CORS configured, but if you're running on a different port, update:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'YOUR_PORT_HERE'],
  credentials: true
}));
```

## Alternative: Direct Database Test

If the API isn't working, you can manually create a notification in MongoDB:

1. Open MongoDB Compass or mongo shell
2. Connect to your database
3. Go to the `notifications` collection
4. Insert a document:

```javascript
{
  "title": "Test Notification",
  "message": "This is a test",
  "type": "info",
  "priority": "medium",
  "targetAudience": "all",
  "createdBy": ObjectId("YOUR_ADMIN_USER_ID"),
  "recipients": [],
  "isActive": true,
  "expiresAt": null,
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

Then refresh your admin panel and check if it appears in the bell icon.

## Check Server Logs

When you click "Create Notification", you should see in the server console:

```
=== CREATE NOTIFICATION REQUEST ===
User: admin@example.com Role: admin
Body: { title: '...', message: '...', ... }
Notification created successfully: 507f1f77bcf86cd799439011
```

If you don't see this, the request isn't reaching the server.

## Check Browser Console

You should see:
```
Submitting notification: {title: '...', message: '...', ...}
Token: Present
Request: POST http://localhost:3000/notifications/create
Response status: 201
Response data: {success: true, ...}
```

## Most Likely Issues

### 1. User is not admin
**Check**: Open browser console and run:
```javascript
fetch('http://localhost:3000/auth/profile', {
  headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
}).then(r => r.json()).then(console.log)
```

Look for `role: 'admin'` in the response.

### 2. Server not running
**Check**: Open http://localhost:3000 in browser
You should see: "Our Server Is In Running Position"

### 3. Token expired or invalid
**Fix**: Logout and login again

### 4. MongoDB not connected
**Check**: Server console should show MongoDB connection message

## Still Not Working?

Run this complete diagnostic:

```javascript
// Paste this in browser console
(async () => {
  console.log('=== DIAGNOSTIC START ===');
  
  // Check token
  const token = localStorage.getItem('token');
  console.log('1. Token exists:', !!token);
  
  // Check user profile
  try {
    const profileRes = await fetch('http://localhost:3000/auth/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const profile = await profileRes.json();
    console.log('2. User profile:', profile);
    console.log('3. Is admin:', profile.user?.role === 'admin');
  } catch (e) {
    console.error('2-3. Profile check failed:', e);
  }
  
  // Check server
  try {
    const serverRes = await fetch('http://localhost:3000');
    const serverText = await serverRes.text();
    console.log('4. Server responding:', serverText);
  } catch (e) {
    console.error('4. Server check failed:', e);
  }
  
  // Try to create notification
  try {
    const createRes = await fetch('http://localhost:3000/notifications/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Diagnostic Test',
        message: 'Testing notification system',
        type: 'info',
        priority: 'medium',
        targetAudience: 'all'
      })
    });
    const createData = await createRes.json();
    console.log('5. Create notification result:', createData);
  } catch (e) {
    console.error('5. Create notification failed:', e);
  }
  
  console.log('=== DIAGNOSTIC END ===');
})();
```

Copy the console output and that will show exactly what's wrong!
