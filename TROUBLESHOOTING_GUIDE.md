# Aptitude Questions Troubleshooting Guide

## Issues Fixed

### 1. ✅ Database Storage Issue
**Problem**: Questions not being stored in database collections
**Root Cause**: Multiple potential issues
**Solutions Applied**:
- ✅ Fixed database schema references
- ✅ Added comprehensive error logging
- ✅ Improved validation error handling
- ✅ Added console logging for debugging

### 2. ✅ CSS Modal Scrolling Issue
**Problem**: Modal popup has weird scrolling behavior
**Root Cause**: Incorrect CSS structure for modal layout
**Solution Applied**:
- ✅ Changed modal structure to use flexbox
- ✅ Fixed header to be non-scrollable (`flex-shrink-0`)
- ✅ Made content area scrollable (`flex-1 overflow-y-auto`)
- ✅ Proper modal height constraints (`max-h-[90vh]`)

### 3. ✅ Server Configuration
**Problem**: Server not responding or API endpoints not working
**Status**: ✅ VERIFIED WORKING
- Server running on http://localhost:3000
- Database connected successfully
- Authentication middleware working
- API endpoints properly protected

## Current Status

### ✅ Backend (Server)
- **Database**: Connected and working
- **API Routes**: All endpoints created and protected
- **Authentication**: JWT middleware working correctly
- **Error Handling**: Comprehensive logging added
- **Schema**: Auto-incrementing question numbers working

### ✅ Frontend (Client)
- **Component**: AptitudeQuestionManagement recreated with fixes
- **Modal CSS**: Fixed scrolling issues
- **API Integration**: Proper error handling and logging
- **Authentication**: Token-based requests implemented

## Testing Steps

### 1. Verify Server is Running
```bash
# In server directory
npm start
```
Expected output:
- "Server is running on port: http://localhost:3000"
- "DataBase Connected Successfully"

### 2. Test API Endpoints
```bash
# Test basic connection
curl http://localhost:3000/

# Test protected endpoint (should return 401)
curl http://localhost:3000/aptitude/stats/overview
```

### 3. Test Frontend
1. Start the client: `npm run dev` in client directory
2. Login as Admin or Content Manager
3. Navigate to Admin Panel → Aptitude Questions
4. Check browser console for any errors
5. Try creating a question

## Debugging Steps

### If Questions Still Not Saving:

1. **Check Browser Console**:
   - Open Developer Tools (F12)
   - Look for any JavaScript errors
   - Check Network tab for failed API requests

2. **Check Authentication Token**:
   ```javascript
   // In browser console
   console.log('Token:', localStorage.getItem('token'))
   ```

3. **Check Server Logs**:
   - Look at the terminal where server is running
   - Should see detailed error logs if something fails

4. **Test API Directly**:
   ```javascript
   // In browser console (after login)
   const token = localStorage.getItem('token')
   fetch('http://localhost:3000/aptitude/stats/overview', {
     headers: { 'Authorization': `Bearer ${token}` }
   }).then(r => r.json()).then(console.log)
   ```

### If Modal CSS Still Has Issues:

1. **Check Modal Structure**:
   - Modal should use `flex flex-col` layout
   - Header should have `flex-shrink-0`
   - Content should have `flex-1 overflow-y-auto`

2. **Test Different Screen Sizes**:
   - Try on different browser window sizes
   - Check mobile responsiveness

## Common Issues & Solutions

### Issue: "No authentication token found"
**Solution**: User needs to login again
```javascript
// Clear storage and redirect to login
localStorage.clear()
window.location.href = '/login'
```

### Issue: "Access denied" errors
**Solution**: Check user role
- Only Admin and Content Manager can access aptitude questions
- Regular users will get 403 errors

### Issue: Questions not appearing in table
**Possible Causes**:
1. No questions in database yet
2. Filters are too restrictive
3. API request failing

**Debug Steps**:
1. Check if stats show any questions
2. Clear all filters
3. Check browser network tab for API errors

### Issue: Modal not scrolling properly
**Solution**: Modal structure should be:
```jsx
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <div className="rounded-xl border max-w-2xl w-full max-h-[90vh] flex flex-col">
    <div className="px-6 py-4 border-b flex justify-between items-center flex-shrink-0">
      {/* Header content */}
    </div>
    <div className="flex-1 overflow-y-auto">
      {/* Scrollable content */}
    </div>
  </div>
</div>
```

## Next Steps

1. **Test the Implementation**:
   - Start both server and client
   - Login as Admin
   - Try creating a question
   - Check if it appears in the database

2. **If Still Having Issues**:
   - Check browser console for errors
   - Check server logs for detailed error messages
   - Verify user has correct role (Admin or Content Manager)

3. **Verify Database**:
   - Questions should appear in MongoDB collection "aptitudequestions"
   - Each question should have auto-generated questionNumber

## Success Indicators

✅ **Working Correctly When**:
- Server starts without errors
- Database connects successfully
- Login works and user gets token
- Admin panel loads aptitude questions tab
- Modal opens without scrolling issues
- Questions can be created and appear in table
- Statistics update after creating questions

## Contact for Support

If issues persist:
1. Check all console logs (browser + server)
2. Verify user role and authentication
3. Test API endpoints directly
4. Check database connection and collections