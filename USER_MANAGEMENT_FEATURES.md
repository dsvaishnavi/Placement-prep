# User Management System - Admin Panel

## Overview
A comprehensive user management system has been implemented for the admin panel with full CRUD operations, role-based access control, and export functionality.

## Features Implemented

### 🔐 Admin-Only Access
- Only users with admin role can access the user management module
- Protected routes with proper authentication and authorization

### 👥 User Display & Information
- **User List Table** with the following columns:
  - User (Name + Email with avatar initials)
  - Role (Admin, Content Manager, User)
  - Last Login date
  - Registration date  
  - Status (Active/Inactive)
  - Actions dropdown

### 🔍 Search & Filtering
- **Search functionality**: Search by name or email
- **Status filter**: Filter by Active/Inactive users
- **Role filter**: Filter by Admin, Content Manager, or User roles
- Real-time filtering with instant results

### ⚙️ User Actions (Dropdown Menu)
Each user has an actions dropdown with the following options:
1. **View Details**: See complete user information in a modal
2. **Edit User**: Modify user name, email, and role
3. **Activate/Deactivate**: Toggle user status
4. **Delete User**: Remove user from system (with confirmation)

### ➕ Add New User
- Modal form to create new users
- Fields: Name, Email, Password, Role
- Form validation and error handling
- Automatic role assignment

### ✏️ Edit User Details
- Modal form to edit existing users
- Update name, email, and role
- Prevents admin from changing their own role
- Email uniqueness validation

### 👁️ User Details Modal
- Complete user information display
- User avatar with initials
- All user metadata including:
  - Registration date
  - Last login
  - Email verification status
  - User ID
  - Current status and role

### 📊 Export Functionality
- **CSV Export** button
- Exports all user data including:
  - Name, Email, Role, Status
  - Registration Date, Last Login
  - Email Verification status
- Automatic file download with timestamp

### 🎨 Theme Support
- Full dark/light theme compatibility
- Consistent styling with the admin panel
- Responsive design for all screen sizes

## API Endpoints

### Server-Side Routes (Admin Only)
All routes require admin authentication (`auth` + `requireAdmin` middleware):

- `GET /admin/users` - Get all users with pagination and search
- `GET /admin/users/:userId` - Get single user details
- `POST /admin/users` - Create new user
- `PUT /admin/users/:userId` - Update user details (name, email, role)
- `PUT /admin/users/:userId/status` - Toggle user active status
- `DELETE /admin/users/:userId` - Delete user
- `GET /admin/users/export/csv` - Export users as CSV

### Security Features
- JWT token authentication
- Role-based access control
- Prevents admin from modifying their own role/status
- Input validation and sanitization
- Secure password hashing for new users

## Technical Implementation

### Client-Side
- **Component**: `UserManagement.jsx` - Standalone, reusable component
- **Integration**: Integrated into `Admin.jsx` as `UsersModule`
- **State Management**: React hooks for local state
- **API Communication**: Fetch API with proper error handling
- **UI/UX**: Modal dialogs, dropdown menus, loading states

### Server-Side
- **Routes**: Enhanced `adminrouter.js` with new endpoints
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with role verification
- **Validation**: Input validation and error handling
- **Export**: CSV generation and file download

### Database Schema
User model includes:
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `role`: Enum ['user', 'admin', 'content-manager']
- `isActive`: Boolean (default: true)
- `emailverified`: Boolean (default: false)
- `createdAt`: Date (auto-generated)
- `lastLogin`: Date (nullable)

## Usage Instructions

### For Admins
1. **Access**: Navigate to Admin Panel → User Management
2. **Search**: Use the search bar to find specific users
3. **Filter**: Use dropdown filters to narrow down results
4. **Actions**: Click the three-dot menu next to any user for actions
5. **Add User**: Click "Add User" button to create new accounts
6. **Export**: Click "Export" button to download user data as CSV

### User Actions Workflow
1. **View Details**: Click "View Details" to see complete user information
2. **Edit User**: Click "Edit User" to modify name, email, or role
3. **Status Toggle**: Click "Activate/Deactivate" to change user status
4. **Delete**: Click "Delete User" and confirm to remove user

## Error Handling
- Network error handling with user-friendly messages
- Form validation with real-time feedback
- Confirmation dialogs for destructive actions
- Toast notifications for all operations
- Graceful loading states and error recovery

## Security Considerations
- All API calls require valid JWT tokens
- Admin-only access with proper role verification
- Prevention of self-modification (admin can't change own role/status)
- Input sanitization and validation
- Secure password handling for new users

## Future Enhancements
- Bulk user operations (bulk delete, bulk role change)
- Advanced filtering (date ranges, email verification status)
- User activity logs and audit trail
- Email notifications for user actions
- Import users from CSV/Excel files
- User profile picture uploads
- Advanced user permissions and custom roles