// Test script for User Management API endpoints
// Run this after starting the server to test the functionality

const BASE_URL = 'http://localhost:3000';

// Test data
const testAdmin = {
  name: 'Test Admin',
  email: 'admin@test.com',
  password: 'admin123'
};

const testUser = {
  name: 'Test User',
  email: 'user@test.com',
  password: 'user123',
  role: 'user'
};

let adminToken = '';
let createdUserId = '';

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(adminToken && { 'Authorization': `Bearer ${adminToken}` }),
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Test functions
async function createAdminAccount() {
  console.log('🔧 Creating admin account...');
  const result = await apiCall('/auth/create-admin', {
    method: 'POST',
    body: JSON.stringify(testAdmin)
  });
  
  if (result.success) {
    adminToken = result.data.token;
    console.log('✅ Admin account created successfully');
    return true;
  } else {
    console.log('ℹ️ Admin might already exist, trying to login...');
    return await loginAdmin();
  }
}

async function loginAdmin() {
  console.log('🔑 Logging in as admin...');
  const result = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: testAdmin.email,
      password: testAdmin.password
    })
  });
  
  if (result.success) {
    adminToken = result.data.token;
    console.log('✅ Admin login successful');
    return true;
  } else {
    console.log('❌ Admin login failed:', result.data?.message);
    return false;
  }
}

async function testGetUsers() {
  console.log('📋 Testing get users...');
  const result = await apiCall('/admin/users');
  
  if (result.success) {
    console.log(`✅ Retrieved ${result.data.users.length} users`);
    return true;
  } else {
    console.log('❌ Failed to get users:', result.data?.message);
    return false;
  }
}

async function testCreateUser() {
  console.log('➕ Testing create user...');
  const result = await apiCall('/admin/users', {
    method: 'POST',
    body: JSON.stringify(testUser)
  });
  
  if (result.success) {
    createdUserId = result.data.user.id;
    console.log('✅ User created successfully:', result.data.user.name);
    return true;
  } else {
    console.log('❌ Failed to create user:', result.data?.message);
    return false;
  }
}

async function testGetUserDetails() {
  if (!createdUserId) {
    console.log('⚠️ Skipping get user details - no user created');
    return false;
  }
  
  console.log('👁️ Testing get user details...');
  const result = await apiCall(`/admin/users/${createdUserId}`);
  
  if (result.success) {
    console.log('✅ User details retrieved:', result.data.user.name);
    return true;
  } else {
    console.log('❌ Failed to get user details:', result.data?.message);
    return false;
  }
}

async function testUpdateUser() {
  if (!createdUserId) {
    console.log('⚠️ Skipping update user - no user created');
    return false;
  }
  
  console.log('✏️ Testing update user...');
  const result = await apiCall(`/admin/users/${createdUserId}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: 'Updated Test User',
      email: testUser.email,
      role: 'content-manager'
    })
  });
  
  if (result.success) {
    console.log('✅ User updated successfully');
    return true;
  } else {
    console.log('❌ Failed to update user:', result.data?.message);
    return false;
  }
}

async function testToggleUserStatus() {
  if (!createdUserId) {
    console.log('⚠️ Skipping toggle status - no user created');
    return false;
  }
  
  console.log('🔄 Testing toggle user status...');
  const result = await apiCall(`/admin/users/${createdUserId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ isActive: false })
  });
  
  if (result.success) {
    console.log('✅ User status toggled successfully');
    return true;
  } else {
    console.log('❌ Failed to toggle user status:', result.data?.message);
    return false;
  }
}

async function testExportUsers() {
  console.log('📊 Testing export users...');
  const result = await apiCall('/admin/users/export/csv');
  
  if (result.success) {
    console.log('✅ Users export successful');
    return true;
  } else {
    console.log('❌ Failed to export users:', result.data?.message);
    return false;
  }
}

async function testDeleteUser() {
  if (!createdUserId) {
    console.log('⚠️ Skipping delete user - no user created');
    return false;
  }
  
  console.log('🗑️ Testing delete user...');
  const result = await apiCall(`/admin/users/${createdUserId}`, {
    method: 'DELETE'
  });
  
  if (result.success) {
    console.log('✅ User deleted successfully');
    return true;
  } else {
    console.log('❌ Failed to delete user:', result.data?.message);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting User Management API Tests\n');
  
  const tests = [
    { name: 'Create/Login Admin', fn: createAdminAccount },
    { name: 'Get Users', fn: testGetUsers },
    { name: 'Create User', fn: testCreateUser },
    { name: 'Get User Details', fn: testGetUserDetails },
    { name: 'Update User', fn: testUpdateUser },
    { name: 'Toggle User Status', fn: testToggleUserStatus },
    { name: 'Export Users', fn: testExportUsers },
    { name: 'Delete User', fn: testDeleteUser }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    console.log(`\n--- ${test.name} ---`);
    const result = await test.fn();
    if (result) {
      passed++;
    } else {
      failed++;
    }
  }
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! User Management system is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the server logs and database connection.');
  }
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch');
  runTests().catch(console.error);
} else {
  // Browser environment
  console.log('Run this in Node.js environment: node test_user_management.js');
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runTests, apiCall };
}