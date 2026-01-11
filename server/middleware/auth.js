import jwt from "jsonwebtoken";
import userModel from "../models/userSchema.js";

// Verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. No token provided." 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    const user = await userModel.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid token. User not found." 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: "Account is deactivated." 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid token." 
    });
  }
};

// Check if user is admin
export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: "Access denied. Admin privileges required." 
    });
  }
  next();
};

// Check if user is admin or content manager
export const requireContentManager = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'content-manager') {
    return res.status(403).json({ 
      success: false, 
      message: "Access denied. Content management privileges required." 
    });
  }
  next();
};

// Check if user is admin or moderator (keeping for backward compatibility)
export const requireModerator = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'moderator') {
    return res.status(403).json({ 
      success: false, 
      message: "Access denied. Moderator privileges required." 
    });
  }
  next();
};

// Role-based access control helper
export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}.` 
      });
    }
    next();
  };
};

// Export auth as default and named exports for flexibility
export { auth as verifyToken };
export default auth;