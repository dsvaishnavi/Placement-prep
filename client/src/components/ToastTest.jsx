import React from 'react';
import { toast } from 'react-toastify';
import { showToast } from '../utils/toast';

const ToastTest = ({ theme }) => {
  const testDirectToast = () => {
    console.log('Testing direct toast...');
    toast.success('Direct toast success message!');
    toast.error('Direct toast error message!');
    toast.warning('Direct toast warning message!');
    toast.info('Direct toast info message!');
  };

  const testUtilityToast = () => {
    console.log('Testing utility toast...');
    showToast.success('Utility toast success message!');
    showToast.error('Utility toast error message!');
    showToast.warning('Utility toast warning message!');
    showToast.info('Utility toast info message!');
  };

  const testSimpleToast = () => {
    console.log('Testing simple toast...');
    toast('Simple toast message!');
  };

  return (
    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Toast Test Component
      </h3>
      
      <div className="space-y-3">
        <button
          onClick={testSimpleToast}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Test Simple Toast
        </button>
        
        <button
          onClick={testDirectToast}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Test Direct Toast Methods
        </button>
        
        <button
          onClick={testUtilityToast}
          className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Test Utility Toast Methods
        </button>
      </div>
      
      <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Click the buttons above to test toast notifications. Check the browser console for debug messages.
      </p>
    </div>
  );
};

export default ToastTest;