// Simple API test without authentication
const testAPI = async () => {
  try {
    console.log('🧪 Testing basic server connection...');
    
    // Test basic server endpoint
    const response = await fetch('http://localhost:3000/');
    const text = await response.text();
    console.log('✅ Server response:', text);
    
    console.log('\n🔐 Testing protected endpoint (should fail without auth)...');
    
    // Test protected endpoint without auth (should fail)
    const protectedResponse = await fetch('http://localhost:3000/aptitude/stats/overview');
    const protectedData = await protectedResponse.json();
    console.log('Response status:', protectedResponse.status);
    console.log('Response data:', protectedData);
    
    if (protectedResponse.status === 401) {
      console.log('✅ Authentication protection is working correctly');
    } else {
      console.log('❌ Authentication protection may not be working');
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
};

testAPI();