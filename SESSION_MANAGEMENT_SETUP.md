# Session Management Setup - Updated to 7 Days

This document explains the updated session management and security features implemented in the Skill Sync application.

## Updated Features

### 1. Extended Session Timeout (7 days)
- **Duration**: 7 days from login
- **Warning**: Users get a warning 1 hour before expiration
- **Auto-logout**: Automatic logout when session expires after 7 days

### 2. Inactivity Detection (2 hours)
- **Timeout**: 2 hours of inactivity
- **Events Tracked**: Mouse movement, clicks, keyboard input, scrolling, touch events
- **Auto-logout**: Automatic logout after 2 hours of inactivity

### 3. Tab/Window Close Detection
- **Behavior**: Session is cleared when user closes tab or window
- **Implementation**: Uses `beforeunload` event and localStorage flags
- **Security**: Forces re-login when returning to the application

### 4. Tab Switching Detection
- **Away Time Tracking**: Tracks when user switches away from tab
- **Timeout**: Logout after 30+ minutes away from tab
- **Implementation**: Uses Page Visibility API

## Updated Configuration

### Timeout Settings
```javascript
const SESSION_TIMEOUT = 7 * 24 * 60 * 60 * 1000; // 7 days
const ACTIVITY_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours
const WARNING_TIME = 60 * 60 * 1000; // 1 hour warning
const TAB_AWAY_TIMEOUT = 30 * 60 * 1000; // 30 minutes away from tab
```

### Server-Side JWT Token
- **Expiration**: 7 days (`expiresIn: "7d"`)
- **Validation**: Server validates tokens on session refresh
- **Renewal**: Tokens can be refreshed to extend session

## User Experience Changes

### 1. No Navbar Timer
- Removed real-time countdown from navbar
- Cleaner interface without constant timer display
- Less user anxiety about session expiration

### 2. Warning System
- Modal appears 1 hour before expiration (instead of 5 minutes)
- More reasonable warning time for 7-day sessions
- Clear option to extend session for another 7 days

### 3. Reduced Monitoring Frequency
- Session checks every 5 minutes (instead of every second)
- Better performance with longer sessions
- Less resource intensive

## Security Considerations

### 1. Balanced Security vs Usability
- 7-day sessions reduce login friction
- 2-hour inactivity timeout maintains security
- Tab close detection prevents unauthorized access

### 2. Token Management
- JWT tokens expire after 7 days
- Server-side validation on refresh
- Automatic cleanup of expired sessions

### 3. Activity Monitoring
- Tracks user interaction patterns
- Logs out inactive users after 2 hours
- Maintains security for shared devices

## Updated Debug Information

### SessionDebug Component
- Shows session age in hours (instead of minutes)
- Displays time left in hours for better readability
- Updates every 30 seconds (instead of 5 seconds)
- More appropriate for 7-day sessions

## Benefits of 7-Day Sessions

### 1. Improved User Experience
- Less frequent login requirements
- Better for regular users
- Reduced interruption to workflow

### 2. Maintained Security
- Inactivity detection still active
- Tab close protection remains
- Token validation on server

### 3. Performance Optimization
- Less frequent session checks
- Reduced server load
- Better resource utilization

## Migration Notes

### Existing Sessions
- Old 30-minute sessions will naturally expire
- New logins will use 7-day timeout
- No data migration required

### Monitoring
- Session analytics will show longer session durations
- Inactivity patterns may change
- User satisfaction likely to improve

## Technical Implementation

### Client-Side Components

#### AuthContext (`client/src/context/AuthContext.jsx`)
- Enhanced with session management logic
- Handles timeouts, inactivity detection, and tab close events
- Manages localStorage and sessionStorage cleanup

#### SessionStatus Component (`client/src/components/SessionStatus.jsx`)
- Shows session countdown in navbar
- Displays warning modal when session is about to expire
- Provides session extension functionality

#### SessionTimeoutModal (`client/src/components/SessionTimeoutModal.jsx`)
- User-friendly modal for session expiration warnings
- Real-time countdown display
- Options to extend session or logout

#### useSessionManager Hook (`client/src/hooks/useSessionManager.js`)
- Centralized session management logic
- Handles session validation and cleanup
- Manages focus/blur events for tab switching

### Server-Side Endpoints

#### Session Refresh (`/auth/refresh-session`)
- **Method**: POST
- **Authentication**: Required (Bearer token)
- **Purpose**: Validates token and allows session extension
- **Response**: Success confirmation with user data

## Configuration

### Timeout Settings
```javascript
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const ACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const WARNING_TIME = 5 * 60 * 1000; // 5 minutes warning
const TAB_AWAY_TIMEOUT = 5 * 60 * 1000; // 5 minutes away from tab
```

### Storage Management
- **localStorage**: Stores token, user data, login time
- **sessionStorage**: Temporary flags for tab state tracking
- **Cleanup**: All storage cleared on logout/timeout

## Security Features

### 1. Token Validation
- Server validates JWT tokens on session refresh
- Invalid tokens result in immediate logout
- Expired tokens are handled gracefully

### 2. Multiple Tab Protection
- Each tab tracks its own session state
- Closing one tab doesn't affect others immediately
- Session sharing across tabs with proper cleanup

### 3. Automatic Cleanup
- All timeouts cleared on logout
- Event listeners removed on component unmount
- Storage cleared on session end

## User Experience

### 1. Session Status Indicator
- Green indicator: Session active
- Yellow indicator: Session expiring soon
- Real-time countdown display

### 2. Warning System
- Modal appears 5 minutes before expiration
- Clear countdown timer
- Easy session extension option

### 3. Graceful Logout
- Different logout reasons (timeout, inactivity, manual)
- Appropriate user notifications
- Smooth redirect to login page

## Testing

### Unit Tests
- AuthContext session management
- Component rendering and interactions
- Timeout and cleanup functionality

### Integration Tests
- End-to-end session flow
- Tab switching scenarios
- Server endpoint validation

## Usage Examples

### Extending Session
```javascript
const extendSession = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch('/auth/refresh-session', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  
  if (response.ok) {
    localStorage.setItem('loginTime', new Date().getTime().toString())
  }
}
```

### Manual Logout
```javascript
const logout = (reason = 'manual') => {
  // Clear all storage
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('loginTime')
  sessionStorage.clear()
  
  // Show appropriate message
  if (reason === 'timeout') {
    alert('Session expired. Please log in again.')
  }
}
```

## Troubleshooting

### Common Issues

1. **Session not extending**: Check server endpoint and token validity
2. **Premature logout**: Verify timeout configurations
3. **Tab detection not working**: Ensure Page Visibility API support

### Debug Information
- Check browser console for session-related logs
- Verify localStorage/sessionStorage contents
- Monitor network requests to refresh endpoint

## Future Enhancements

1. **Remember Me Option**: Longer session for trusted devices
2. **Session Analytics**: Track session patterns and usage
3. **Multi-Device Management**: Handle sessions across devices
4. **Progressive Warnings**: Multiple warning intervals
5. **Offline Session Handling**: Manage sessions when offline

## Security Considerations

1. **Token Security**: Tokens stored in localStorage (consider httpOnly cookies for production)
2. **XSS Protection**: Validate and sanitize all user inputs
3. **CSRF Protection**: Implement CSRF tokens for state-changing operations
4. **Session Fixation**: Generate new session IDs on login
5. **Concurrent Sessions**: Consider limiting concurrent sessions per user