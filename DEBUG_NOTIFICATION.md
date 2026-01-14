# Debug Notification System

## Steps to Debug

### 1. Check Server is Running
Open terminal and run:
```bash
cd server
npm start
```

Look for:
- "Server is running on port: http://localhost:3000"
- "MongoDB connected successfully" (or similar)

### 2. Check Browser Console
1. Open your browser
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Navigate to Admin Panel > Notifications
5. Look for any error messages

### 3. Check Network Tab
1. In Developer Tools, go to Network tab
2. Try to create a notification
3. Look for the request to `/notifications/create`
4. Check:
   - Status code (should be 201 for success)
   - Response body
   - Request headers (should have Authorization)
   - Request payload

### 4. Common Issues and Solutions

#### Issue: "Access denied. Admin privileges required"
**Solution**: Make sure you're logged in as an admin user
- Check localStorage for 'token'
- Verify your user role is 'admin' in the database

#### Issue: "Failed to fetch notifications"
**Solution**: 
- Check if server is running
- Check CORS settings in server.js
- Verify MongoDB is connected

#### Issue: Button not responding
**Solution**:
- Check browser console for JavaScript errors
- Verify the modal is opening (check if `showCreateModal` is true)
- Check if form validation is passing

#### Issue: "Network Error" or "Failed to fetch"
**Solution**:
- Verify server URL is correct (http://localhost:3000)
- Check if CORS is properly configured
- Make sure both client and server are running

### 5. Manual API Test

You can test the API directly using curl or Postman:

#### Get your token:
1. Login to the app
2. Open browser console
3. Type: `localStorage.getItem('token')`
4. Copy the token value

#### Test Create Notification:
```bash
curl -X POST http://localhost:3000/notifications/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Test Notification",
    "message": "This is a test",
    "type": "info",
    "priority": "medium",
    "targetAudience": "all"
  }'
```

#### Test Get All Notifications:
```bash
curl -X GET http://localhost:3000/notifications/all \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 6. Check Server Logs

When you try to create a notification, you should see in the server console:
```
=== CREATE NOTIFICATION REQUEST ===
User: admin@example.com Role: admin
Body: { title: '...', message: '...', ... }
Notification created successfully: 507f1f77bcf86cd799439011
```

If you don't see these logs, the request isn't reaching the server.

### 7. Check MongoDB

Make sure MongoDB is running and connected:
1. Check server console for MongoDB connection message
2. Verify .env file has correct MONGODB_URI
3. Try connecting to MongoDB directly to verify it's running

### 8. Verify User is Admin

In MongoDB, check your user document:
```javascript
db.usersDatas.findOne({ email: "your-email@example.com" })
```

Make sure the `role` field is set to `"admin"`.

### 9. Check for JavaScript Errors

Common errors to look for:
- "Cannot read property of undefined"
- "Network request failed"
- "CORS policy" errors
- "401 Unauthorized"
- "403 Forbidden"

### 10. Quick Fix Checklist

✅ Server is running on port 3000
✅ Client is running on port 5173
✅ MongoDB is connected
✅ You're logged in as admin
✅ Token exists in localStorage
✅ No CORS errors in console
✅ No JavaScript errors in console
✅ Network requests are being sent
✅ Server is receiving requests (check server logs)

## Still Not Working?

If you've checked all the above and it's still not working, please provide:
1. Browser console errors (screenshot or copy-paste)
2. Server console logs (when you try to create notification)
3. Network tab details (request/response)
4. Your user role from the database

This will help identify the exact issue!
