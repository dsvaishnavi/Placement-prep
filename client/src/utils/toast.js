import { toast } from 'react-toastify';

// Toast utility functions with consistent styling
export const showToast = {
  success: (message, options = {}) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options
    });
  },

  error: (message, options = {}) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 7000, // Slightly longer for errors
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options
    });
  },

  warning: (message, options = {}) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options
    });
  },

  info: (message, options = {}) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options
    });
  },

  // Custom toast for loading states
  loading: (message, options = {}) => {
    return toast.loading(message, {
      position: "top-right",
      ...options
    });
  },

  // Update a loading toast
  update: (toastId, type, message, options = {}) => {
    toast.update(toastId, {
      render: message,
      type: type,
      isLoading: false,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options
    });
  },

  // Dismiss all toasts
  dismissAll: () => {
    toast.dismiss();
  }
};

// Default export for convenience
export default showToast;