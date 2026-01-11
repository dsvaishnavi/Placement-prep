# Navbar Visibility Logic

## Overview
The main navigation bar is conditionally rendered based on the current route to prevent layout conflicts and provide appropriate user experiences for different page types.

## Pages WITHOUT Main Navbar

### Landing Page
- **Route**: `/`
- **Reason**: Has its own custom header design integrated into the landing page layout

### Authentication Pages
- **Routes**: `/login`, `/signup`, `/admin-setup`
- **Reason**: Full-screen centered layouts designed for focused user authentication flows
- **Design**: Use `min-h-screen` with centered content, no need for navigation

### Admin Pages
- **Routes**: `/admin`
- **Reason**: Has its own complete admin header with navigation, user menu, and admin-specific controls
- **Design**: Self-contained admin interface with its own navigation system

### Test Pages
- **Routes**: `/toast-test`
- **Reason**: Standalone testing pages that don't need main navigation

## Pages WITH Main Navbar

### Protected Application Pages
- **Routes**: `/home`, `/aptitude`, `/core-concepts`, `/progress`, `/resumeanalyzer`
- **Reason**: Main application pages that benefit from consistent navigation and user controls

### Public Content Pages
- **Routes**: `/privacy`, `/terms`, `/cookies`, `/about`, `/contact`, `/blog`, `/careers`
- **Reason**: Public pages that users might want to navigate between

## Implementation

### App.jsx Logic
```javascript
// Check if we should show navbar (exclude specific page types)
const authPages = ['/login', '/signup', '/admin-setup']
const adminPages = ['/admin']
const testPages = ['/toast-test']
const excludedPages = ['/', ...authPages, ...adminPages, ...testPages]
const showNavbar = !excludedPages.includes(location.pathname)
```

### Conditional Rendering
```javascript
{showNavbar && <Navbar theme={currentTheme} setTheme={setCurrentTheme} />}
```

## Benefits

### Prevents Layout Conflicts
- Eliminates navbar overlap issues on admin pages
- Avoids double navigation (main navbar + admin header)
- Maintains clean, focused layouts for auth flows

### Improves User Experience
- Full-screen auth pages for better focus
- Dedicated admin interface without distractions
- Consistent navigation on main app pages

### Maintains Design Integrity
- Each page type has appropriate navigation
- No unnecessary UI elements cluttering specialized pages
- Responsive design works properly on all page types

## Adding New Pages

### To Exclude from Navbar
Add the route to the appropriate array in App.jsx:
```javascript
const authPages = ['/login', '/signup', '/admin-setup', '/new-auth-page']
const adminPages = ['/admin', '/admin-dashboard']
const testPages = ['/toast-test', '/new-test-page']
```

### To Include Navbar
No changes needed - navbar shows by default for routes not in exclusion lists.

This approach provides a clean, maintainable way to control navbar visibility while ensuring each page type has the appropriate navigation experience.