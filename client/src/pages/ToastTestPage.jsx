import React from 'react';
import { toast } from 'react-toastify';

const ToastTestPage = () => {
  const handleTestToast = () => {
    console.log('Button clicked - testing toast');
    toast.success('This is a test toast message!');
    toast.error('This is an error toast!');
    toast.warning('This is a warning toast!');
    toast.info('This is an info toast!');
    toast('This is a default toast!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Toast Test Page</h1>
        <button
          onClick={handleTestToast}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Toast Messages
        </button>
        <p className="mt-4 text-gray-600">
          Click the button to test toast notifications.
        </p>
      </div>
    </div>
  );
};

export default ToastTestPage;