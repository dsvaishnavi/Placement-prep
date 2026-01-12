// Test script for dashboard functionality
const API_BASE = 'http://localhost:3000';

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TEST_TOKEN || 'your-admin-token-here'}`,
        ...options.headers
      },
      ...options
    });

    const data = await response.json();
    return {
      success: response.ok,
      status: response.status,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Test dashboard stats endpoint
async function testDashboardStats() {
  console.log('📊 Testing dashboard stats endpoint...');
  const result = await apiCall('/admin/stats');
  
  if (result.success) {
    console.log('✅ Stats endpoint working!');
    console.log('📈 User stats:', result.data.stats.users);
    console.log('👥 Total users:', result.data.stats.users.total);
    console.log('🔵 Active users:', result.data.stats.users.active);
    console.log('👑 Admins:', result.data.stats.users.byRole.admin);
    console.log('📝 Content Managers:', result.data.stats.users.byRole.contentManager);
    console.log('👤 Regular Users:', result.data.stats.users.byRole.user);
  } else {
    console.log('❌ Stats endpoint failed:', result.data?.message || result.error);
  }
  
  return result.success;
}

// Test recent activity endpoint
async function testRecentActivity() {
  console.log('\n🕒 Testing recent activity endpoint...');
  const result = await apiCall('/admin/recent-activity?limit=5');
  
  if (result.success) {
    console.log('✅ Recent activity endpoint working!');
    console.log('📋 Activities found:', result.data.activities.length);
    
    if (result.data.activities.length > 0) {
      console.log('🔍 Sample activities:');
      result.data.activities.slice(0, 3).forEach((activity, index) => {
        console.log(`  ${index + 1}. ${activity.user.name} - ${activity.description} (${activity.type})`);
      });
    } else {
      console.log('ℹ️ No recent activities found');
    }
  } else {
    console.log('❌ Recent activity endpoint failed:', result.data?.message || result.error);
  }
  
  return result.success;
}

// Test user creation to generate activity
async function testCreateTestUser() {
  console.log('\n👤 Creating test user to generate activity...');
  
  const testUser = {
    name: 'Dashboard Test User',
    email: `test-${Date.now()}@example.com`,
    password: 'testpassword123',
    role: 'user'
  };
  
  const result = await apiCall('/admin/users', {
    method: 'POST',
    body: JSON.stringify(testUser)
  });
  
  if (result.success) {
    console.log('✅ Test user created successfully!');
    console.log('👤 User ID:', result.data.user.id);
    return result.data.user.id;
  } else {
    console.log('❌ Failed to create test user:', result.data?.message || result.error);
    return null;
  }
}

// Main test function
async function runDashboardTests() {
  console.log('🚀 Starting Dashboard API Tests\n');
  console.log('⚠️  Note: Make sure you have a valid admin token set in TEST_TOKEN environment variable');
  console.log('   or update the token in the apiCall function\n');
  
  let passed = 0;
  let total = 0;
  
  // Test stats endpoint
  total++;
  if (await testDashboardStats()) passed++;
  
  // Test recent activity endpoint
  total++;
  if (await testRecentActivity()) passed++;
  
  // Create test user to generate activity
  const testUserId = await testCreateTestUser();
  
  // Test recent activity again to see new activity
  if (testUserId) {
    console.log('\n🔄 Testing recent activity after user creation...');
    total++;
    if (await testRecentActivity()) passed++;
  }
  
  console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All dashboard tests passed! The dashboard should work correctly.');
  } else {
    console.log('⚠️  Some tests failed. Check the error messages above.');
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runDashboardTests().catch(console.error);
}

export { runDashboardTests, testDashboardStats, testRecentActivity };