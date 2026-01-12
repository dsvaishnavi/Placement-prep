# Role-Based Access Control System

This system implements a three-tier role-based access control structure for the learning platform.

## User Roles

### 1. Admin
- **Full Access**: Complete system administration
- **Permissions**:
  - User Management (create, edit, delete users)
  - Content Management (aptitude questions, core concepts)
  - System Settings
  - Analytics and Reports
- **Access Routes**: `/admin`

### 2. Content Manager
- **Limited Access**: Educational content management only
- **Permissions**:
  - Aptitude Questions (create, edit, delete)
  - Core Concepts (create, edit, delete)
  - Content Analytics
- **Restrictions**: No user management or system settings
- **Access Routes**: `/content-management`

### 3. User
- **Basic Access**: Learning platform features
- **Permissions**:
  - Take tests and quizzes
  - View progress and analytics
  - Access learning materials
- **Access Routes**: `/home`, `/aptitude`, `/core-concepts`, `/progress`

## Implementation Details

### Backend (Server)

#### Middleware (`server/middleware/auth.js`)
- `requireAdmin`: Admin-only access
- `requireContentManager`: Admin and Content Manager access
- `requireRole(roles)`: Flexible role-based access

#### Routes
- `/auth/*`: Authentication routes (public)
- `/admin/*`: Admin-only routes
- `/content/*`: Content management routes (Admin + Content Manager)

#### Example Usage
```javascript
// Admin only
router.get("/users", auth, requireAdmin, getUsersHandler);

// Admin and Content Manager
router.post("/aptitude-questions", auth, requireContentManager, createQuestionHandler);

// Flexible role checking
router.get("/stats", auth, requireRole(['admin', 'content-manager']), getStatsHandler);
```

### Frontend (Client)

#### Protected Routes (`client/src/components/ProtectedRoute.jsx`)
```jsx
// Admin only
<ProtectedRoute requiredRoles={['admin']}>
  <AdminPanel />
</ProtectedRoute>

// Admin and Content Manager
<ProtectedRoute requiredRoles={['admin', 'content-manager']}>
  <ContentManagement />
</ProtectedRoute>
```

#### Role-Based Navigation (`client/src/components/Navbar.jsx`)
- Profile dropdown shows appropriate management buttons based on user role
- Admin users see "Admin Panel" button
- Content Manager users see "Content Management" button  
- Regular users see no management buttons
- Integrated seamlessly into existing navigation

#### Admin Panel (`client/src/pages/Admin.jsx`)
- Supports both full admin mode and content manager mode
- Dynamically shows/hides features based on user permissions
- Prevents access to restricted modules

## User Experience

### Admin Users
1. Login → Redirected to `/admin`
2. Full admin panel with all modules (Dashboard, User Management, Content Management, Settings)
3. Can manage users, content, and system settings
4. Access via "Admin Panel" button in profile dropdown

### Content Manager Users
1. Login → Redirected to `/home` 
2. Can access `/content-management` for content editing via "Content Management" button in profile dropdown
3. Limited admin panel with only content modules (Aptitude Questions, Core Concepts)
4. **No access to Dashboard, User Management, or Settings**

### Regular Users
1. Login → Redirected to `/home`
2. Standard learning platform interface
3. No administrative access or management buttons in profile dropdown

## Security Features

1. **JWT Token Validation**: All protected routes require valid authentication
2. **Role Verification**: Server-side role checking on every request
3. **Frontend Protection**: UI elements hidden/shown based on permissions
4. **Route Guards**: Unauthorized access redirects to appropriate pages
5. **Self-Protection**: Users cannot modify their own roles/status

## API Endpoints

### Admin Routes (`/admin/*`)
- `GET /admin/users` - List all users (Admin only)
- `PUT /admin/users/:id/role` - Update user role (Admin only)
- `PUT /admin/users/:id/status` - Update user status (Admin only)
- `DELETE /admin/users/:id` - Delete user (Admin only)
- `GET /admin/stats` - Platform statistics (Admin + Content Manager)

### Content Routes (`/content/*`)
- `GET /content/aptitude-questions` - List questions (Admin + Content Manager)
- `POST /content/aptitude-questions` - Create question (Admin + Content Manager)
- `PUT /content/aptitude-questions/:id` - Update question (Admin + Content Manager)
- `DELETE /content/aptitude-questions/:id` - Delete question (Admin + Content Manager)
- `GET /content/core-concepts` - List concepts (Admin + Content Manager)
- `POST /content/core-concepts` - Create concept (Admin + Content Manager)
- `PUT /content/core-concepts/:id` - Update concept (Admin + Content Manager)
- `DELETE /content/core-concepts/:id` - Delete concept (Admin + Content Manager)

## Testing the System

### 1. Create Test Users
```javascript
// Admin user (use /auth/create-admin endpoint)
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123"
}

// Content Manager (create via admin panel or direct DB)
{
  "name": "Content Manager",
  "email": "content@example.com",
  "password": "content123",
  "role": "content-manager"
}
```

### 2. Test Access Levels
1. Login as Admin → Should see full admin panel
2. Login as Content Manager → Should see limited content management
3. Login as User → Should see standard learning interface
4. Try accessing restricted routes → Should redirect to unauthorized page

### 3. Verify API Security
- Test API endpoints with different user tokens
- Ensure proper 403 responses for unauthorized access
- Verify role-based data filtering

## Future Enhancements

1. **Granular Permissions**: More specific permissions within roles
2. **Role Hierarchy**: Inheritance-based permission system
3. **Audit Logging**: Track all administrative actions
4. **Bulk Operations**: Mass user/content management
5. **Role Templates**: Predefined permission sets
6. **Time-based Access**: Temporary role assignments

## Troubleshooting

### Common Issues
1. **Unauthorized Access**: Check JWT token validity and user role
2. **Missing Navigation**: Verify user role in AuthContext
3. **API Errors**: Ensure proper middleware order in routes
4. **UI Not Updating**: Check role-based conditional rendering

### Debug Steps
1. Check browser console for authentication errors
2. Verify user object in AuthContext
3. Test API endpoints directly with Postman
4. Check server logs for middleware execution