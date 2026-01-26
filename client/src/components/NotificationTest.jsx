import { useState } from 'react';

// Simple test component to verify notification API works
function NotificationTest() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testCreate = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      
      const response = await fetch('http://localhost:3000/notifications/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: 'Test Notification',
          message: 'This is a test notification from the test component',
          type: 'info',
          priority: 'medium',
          targetAudience: 'all'
        })
      });
      
      const data = await response.json();
      console.log('Response:', data);
      
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testGetAll = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:3000/notifications/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      console.log('Response:', data);
      
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testMyNotifications = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:3000/notifications/my-notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      console.log('Response:', data);
      
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Notification API Test</h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={testCreate}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Test Create Notification
          </button>
          
          <button
            onClick={testGetAll}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Test Get All
          </button>
          
          <button
            onClick={testMyNotifications}
            disabled={loading}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            Test My Notifications
          </button>
        </div>
        
        {result && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Result:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationTest;
