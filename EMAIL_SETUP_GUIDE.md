# Email Configuration Guide for Skill Sync

## Current Status
✅ Server is running successfully  
⚠️ Email service needs configuration for production use  
✅ Development mode active (OTP logged to console)  

## For Development (Current Setup)
The application is currently configured to work in development mode:
- When you sign up, the OTP will be displayed in the server console
- You can use this OTP to complete the registration process
- No email setup required for testing

## For Production (Email Setup Required)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Turn on 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. In Google Account settings, go to Security
2. Click on "2-Step Verification"
3. Scroll down and click on "App passwords"
4. Select "Mail" as the app type
5. Generate a new app password
6. Copy the 16-character password (ignore spaces)

### Step 3: Update Environment Variables
Update your `server/.env` file:
```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### Step 4: Test Email Configuration
You can test the email setup by making a POST request to:
```
POST http://localhost:3000/auth/test-email
```

## Alternative Email Services

If you prefer not to use Gmail, you can configure other email services:

### Outlook/Hotmail
```javascript
service: 'hotmail'
host: 'smtp-mail.outlook.com'
port: 587
```

### Yahoo
```javascript
service: 'yahoo'
host: 'smtp.mail.yahoo.com'
port: 587
```

### Custom SMTP
```javascript
host: 'your-smtp-server.com'
port: 587
secure: false
```

## Troubleshooting

### Common Issues:
1. **"Missing credentials for PLAIN"** - Need App Password instead of regular password
2. **"Invalid login"** - Check email and app password are correct
3. **"Connection timeout"** - Check firewall/network settings

### Development Mode Features:
- OTP is logged to server console
- Registration works even without email
- No email configuration required for testing

## Security Notes
- Never commit real email credentials to version control
- Use environment variables for all sensitive data
- App passwords are more secure than regular passwords for SMTP
- Consider using email services like SendGrid or Mailgun for production

## Current Development Workflow
1. Start the server: `npm start` in the server directory
2. Try to sign up with any email
3. Check the server console for the OTP
4. Use the OTP to complete registration
5. The system works fully without email configuration