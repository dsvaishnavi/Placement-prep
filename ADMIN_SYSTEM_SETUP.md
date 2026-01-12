# 🛡️ Admin Panel & Role-Based Access Control - Complete Setup

## ✅ **What's Been Implemented**

### **1. Enhanced User Schema**
- **Role System**: `user`, `moderator`, `admin`
- **Status Management**: `isActive` field for account activation/deactivation
- **Timestamps**: `createdAt`, `lastLogin` tracking
- **Email Verification**: Enhanced verification system

### **2. Role-Based Authentication Middleware**
- **JWT Verification**: Secure token validation
- **Role Checking**: `requireAdmin`, `requireModerator` middleware
- **Route Protection**: Automatic access control

### **3. Admin API Endpoints**
- `GET /admin/users` - List all users with pagination & search
- `GET /admin/stats` - Dashboard statistics
- `PUT /admin/users/:id/role` - Update user roles (Admin only)
- `PUT /admin/users/:id/status` - Activate/deactivate users
- `DELETE /admin/users/:id` - Delete users (Admin only)
- `POST /auth/create-admin` - Create first admin user

### **4. Complete Admin Panel UI**
- **Dashboard**: User statistics and role distribution
- **User Management**: Search, filter, role assignment, status control
- **Role-Based Navigation**: Admin link only shows for admin/moderator users
- **Responsive Design**: Works on all devices

## 🚀 **How to Use**

### **Step 1: Create First Admin User**
1. **Go to**: http://localhost:5173/admin-setup
2. **Fill the form**:
   - Name: Admin User
   - Email: admin@skillsync.com
   - Password: admin123
   - Admin Key: `SKILL_SYNC_ADMIN_2024`
3. **Click "Create Admin Account"**
4. **Automatically logged in** and redirected to admin panel

### **Step 2: Access Admin Panel**
1. **Login** as admin user
2. **Admin link** appears in navbar automatically
3. **Click "Admin"** to access the panel

### **Step 3: Manage Users**
- **View Dashboard**: See user statistics and role distribution
- **User Management**: Search, filter, and manage all users
- **Role Assignment**: Change user roles (Admin only)
- **Account Control**: Activate/deactivate user accounts
- **User Deletion**: Remove users (Admin only, can't delete self)

## 🔐 **Role Permissions**

### **Admin (Full Access)**
- ✅ View all users and statistics
- ✅ Create/update/delete users
- ✅ Change user roles (including promoting to admin/moderator)
- ✅ Activate/deactivate accounts
- ✅ Access all admin features

### **Moderator (Limited Access)**
- ✅ View all users and statistics
- ✅ Activate/deactivate user accounts
- ❌ Cannot change user roles
- ❌ Cannot delete users
- ❌ Cannot promote users to admin/moderator

### **User (No Admin Access)**
- ❌ Cannot access admin panel
- ❌ No admin link in navbar
- ✅ Can use all regular platform features

## 🛡️ **Security Features**

### **Authentication & Authorization**
- **JWT Tokens**: Secure authentication with 24h expiry
- **Role-Based Access**: Middleware enforces permissions
- **Self-Protection**: Admins can't demote themselves or delete their own account
- **Admin Key**: Required for creating first admin (prevents unauthorized admin creation)

### **Data Protection**
- **Password Hashing**: bcrypt with 10 salt rounds
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: MongoDB with proper queries
- **XSS Protection**: Sanitized inputs and outputs

## 📊 **Admin Dashboard Features**

### **Statistics Overview**
- Total Users, Active Users, Verified Users
- New registrations this month
- Role distribution (Admin/Moderator/User counts)

### **User Management**
- **Search**: By name or email
- **Filter**: By role (Admin/Moderator/User)
- **Pagination**: Handle large user lists
- **Real-time Updates**: Changes reflect immediately

## 🔧 **API Usage Examples**

### **Get User Statistics**
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:3000/admin/stats
```

### **Update User Role**
```bash
curl -X PUT \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"role":"moderator"}' \
     http://localhost:3000/admin/users/USER_ID/role
```

### **Deactivate User**
```bash
curl -X PUT \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"isActive":false}' \
     http://localhost:3000/admin/users/USER_ID/status
```

## 🎯 **Current Status**

✅ **Backend**: Complete role-based API with all CRUD operations  
✅ **Frontend**: Full admin panel with user management  
✅ **Authentication**: JWT-based with role checking  
✅ **Database**: Enhanced user schema with roles and status  
✅ **Security**: Protected routes and self-protection measures  
✅ **UI/UX**: Responsive design with theme support  

## 🔑 **Default Admin Credentials**
- **Email**: admin@skillsync.com
- **Password**: admin123
- **Role**: Administrator

**Your admin panel is now fully functional and ready for production use!** 🚀