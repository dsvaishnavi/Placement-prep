// Session Management Test Utility
// This file can be used to test session functionality

export const testSessionFeatures = () => {
  console.log('🔐 Session Management Features Test');
  
  // Test 1: Check if login time is stored
  const loginTime = localStorage.getItem('loginTime');
  console.log('✅ Login time storage:', loginTime ? 'Working' : 'Not set');
  
  // Test 2: Check session age calculation
  if (loginTime) {
    const sessionAge = new Date().getTime() - parseInt(loginTime);
    const sessionAgeMinutes = Math.floor(sessionAge / 60000);
    console.log(`⏰ Session age: ${sessionAgeMinutes} minutes`);
    
    const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    const timeLeft = SESSION_TIMEOUT - sessionAge;
    const timeLeftMinutes = Math.floor(timeLeft / 60000);
    console.log(`⏳ Time left: ${timeLeftMinutes} minutes`);
  }
  
  // Test 3: Check storage contents
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  console.log('🎫 Token stored:', token ? 'Yes' : 'No');
  console.log('👤 User data stored:', user ? 'Yes' : 'No');
  
  // Test 4: Check tab close flag
  const tabClosed = localStorage.getItem('tabClosed');
  console.log('🚪 Tab close detection:', tabClosed ? 'Flag set' : 'Normal');
  
  // Test 5: Session storage check
  const tabHiddenTime = sessionStorage.getItem('tabHiddenTime');
  console.log('👁️ Tab visibility tracking:', tabHiddenTime ? 'Active' : 'Normal');
  
  console.log('🎯 Session management test completed!');
};

// Auto-run test in development
if (import.meta.env.DEV) {
  // Uncomment to run test automatically
  // testSessionFeatures();
}

export default testSessionFeatures;