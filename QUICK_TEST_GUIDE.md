# Quick Test Guide - Notification Feature

## 🚀 Quick Start

### Step 1: Start the Application

**Terminal 1 - Start Server:**
```bash
cd server
npm start
```
Server should start on: http://localhost:3000

**Terminal 2 - Start Client:**
```bash
cd client
npm run dev
```
Client should start on: http://localhost:5173

### Step 2: Test as Admin

1. **Login as Admin**
   - Go to http://localhost:5173
   - Click "Login"
   - Use admin credentials

2. **Create a Notification**
   - Click on your profile icon (top right)
   - Click "Admin Panel"
   - Click "Notifications" in the sidebar
   - Click "Create Notification" button
   - Fill in the form:
     ```
     Title: Welcome to Skill Sync!
     Message: This is a test notification to verify the system is working.
     Type: info
     Priority: medium
     Target Audience: all
     ```
   - Click "Create"

3. **Check the Bell Icon**
   - Look at the navbar (top right)
   - You should see a bell icon 🔔
   - If there's an unread notification, you'll see a red badge with "1"

4. **View the Notification**
   - Click the bell icon
   - A dropdown should appear showing your notification
   - The notification should have:
     - Blue background (unread)
     - Info icon
     - Title and message
     - "Just now" timestamp
     - "medium" priority badge

5. **Mark as Read**
   - Click on the notification
   - The blue background should disappear
   - The red badge on the bell should disappear
   - The notification should now show as read

### Step 3: Test as Regular User

1. **Logout and Login as User**
   - Click profile icon → Logout
   - Login with a regular user account

2. **Check Notifications**
   - Look for the bell icon in navbar
   - You should see the notification created by admin
   - Test marking it as read

### Step 4: Test Auto-Refresh

1. **Keep Dropdown Open**
   - Click the bell icon to open dropdown
   - Keep it open

2. **Create Another Notification (in another tab/window)**
   - Open another browser tab
   - Login as admin
   - Create another notification

3. **Wait 30 Seconds**
   - Go back to the first tab
   - After 30 seconds, the new notification should appear automatically

## ✅ What to Look For

### Visual Checks:
- [ ] Bell icon appears in navbar (only when logged in)
- [ ] Red badge shows unread count
- [ ] Badge shows correct number (1, 2, 3, etc.)
- [ ] Badge shows "99+" for 100+ notifications
- [ ] Dropdown opens when clicking bell
- [ ] Dropdown closes when clicking outside
- [ ] Unread notifications have blue background
- [ ] Read notifications have normal background
- [ ] Icons match notification type (info, success, warning, error)
- [ ] Priority badges show correct color
- [ ] Time ago updates correctly
- [ ] Theme switching works (dark/light)

### Functional Checks:
- [ ] Notifications load on page load
- [ ] Clicking notification marks it as read
- [ ] "Mark all read" button works
- [ ] Badge count updates after marking as read
- [ ] Auto-refresh works (30 seconds)
- [ ] No console errors
- [ ] Responsive on mobile

## 🐛 Common Issues

### Issue: Bell icon not showing
**Solution**: Make sure you're logged in. The bell only shows for authenticated users.

### Issue: No notifications showing
**Solution**: 
1. Check if server is running
2. Create a notification in Admin Panel
3. Check browser console for errors

### Issue: Badge not updating
**Solution**: 
1. Close and reopen the dropdown
2. Wait for auto-refresh (30 seconds)
3. Refresh the page

### Issue: Styling looks broken
**Solution**:
1. Clear browser cache
2. Make sure Tailwind CSS is working
3. Check if theme prop is passed correctly

## 📸 Expected Screenshots

### Desktop View:
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] [Home] [Aptitude] [Core]  [🔔¹] [☰] [👤 User]  │
└─────────────────────────────────────────────────────────┘
                                      ↑
                                  Red badge with count
```

### Dropdown Open:
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] [Home] [Aptitude] [Core]  [🔔¹] [☰] [👤 User]  │
│                                    │                     │
│                                    ▼                     │
│                            ┌──────────────────────┐     │
│                            │ Notifications        │     │
│                            │ 1 unread             │     │
│                            ├──────────────────────┤     │
│                            │ ℹ️ Welcome!          │     │
│                            │ This is a test...    │     │
│                            │ Just now [medium]    │     │
│                            ├──────────────────────┤     │
│                            │ [Close]              │     │
│                            └──────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### Mobile View:
```
┌──────────────────────────┐
│ [Logo]  [🔔¹] [☰] [👤]  │
└──────────────────────────┘
```

## 🎯 Success Criteria

All of these should work:
1. ✅ Bell icon visible when logged in
2. ✅ Badge shows correct unread count
3. ✅ Dropdown opens/closes correctly
4. ✅ Notifications display with proper styling
5. ✅ Mark as read works
6. ✅ Mark all as read works
7. ✅ Auto-refresh works
8. ✅ Theme switching works
9. ✅ Responsive on mobile
10. ✅ No errors in console

## 🎉 You're Done!

If all the checks pass, the notification feature is working perfectly! Users can now receive and view notifications from admins in real-time.

## 📝 Notes

- Notifications auto-refresh every 30 seconds
- Admins can create notifications in Admin Panel → Notifications
- Notifications can be targeted to specific audiences (all, users, admins, content-managers)
- Notifications can have different types (info, success, warning, error, announcement)
- Notifications can have different priorities (low, medium, high, urgent)
- Notifications can have expiration dates
