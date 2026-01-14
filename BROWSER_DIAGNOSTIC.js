// Copy and paste this entire script into your browser console
// when you're on the admin panel page

(async function diagnosticTest() {
  console.log('%c=== NOTIFICATION SYSTEM DIAGNOSTIC ===', 'color: blue; font-size: 16px; font-weight: bold');
  console.log('Starting comprehensive diagnostic...\n');
  
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };
  
  // Test 1: Check if token exists
  console.log('%c[Test 1] Checking authentication token...', 'color: purple');
  const token = localStorage.getItem('token');
  if (token) {
    results.passed.push('✅ Token exists in localStorage');
    console.log('✅ Token found:', token.substring(0, 20) + '...');
  } else {
    results.failed.push('❌ No token found - User not logged in');
    console.error('❌ No token found in localStorage');
  }
  
  // Test 2: Check user profile and role
  console.log('\n%c[Test 2] Checking user profile and role...', 'color: purple');
  try {
    const profileRes = await fetch('http://localhost:3000/auth/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const profileData = await profileRes.json();
    
    if (profileData.success) {
      console.log('✅ Profile retrieved:', profileData.user);
      results.passed.push('✅ User profile retrieved successfully');
      
      if (profileData.user.role === 'admin') {
        results.passed.push('✅ User has admin role');
        console.log('✅ User is admin');
      } else {
        results.failed.push('❌ User is not admin (role: ' + profileData.user.role + ')');
        console.error('❌ User role:', profileData.user.role, '(needs to be "admin")');
      }
    } else {
      results.failed.push('❌ Failed to get profile: ' + profileData.message);
      console.error('❌ Profile error:', profileData.message);
    }
  } catch (error) {
    results.failed.push('❌ Profile request failed: ' + error.message);
    console.error('❌ Profile request error:', error);
  }
  
  // Test 3: Check if server is running
  console.log('\n%c[Test 3] Checking if server is running...', 'color: purple');
  try {
    const serverRes = await fetch('http://localhost:3000');
    const serverText = await serverRes.text();
    
    if (serverText.includes('Running')) {
      results.passed.push('✅ Server is running');
      console.log('✅ Server response:', serverText);
    } else {
      results.warnings.push('⚠️ Server responded but with unexpected message');
      console.warn('⚠️ Server response:', serverText);
    }
  } catch (error) {
    results.failed.push('❌ Cannot connect to server: ' + error.message);
    console.error('❌ Server connection error:', error);
  }
  
  // Test 4: Test GET all notifications
  console.log('\n%c[Test 4] Testing GET /notifications/all...', 'color: purple');
  try {
    const getAllRes = await fetch('http://localhost:3000/notifications/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const getAllData = await getAllRes.json();
    
    console.log('Response status:', getAllRes.status);
    console.log('Response data:', getAllData);
    
    if (getAllData.success) {
      results.passed.push('✅ GET /notifications/all works');
      console.log('✅ Found', getAllData.notifications.length, 'notifications');
    } else {
      results.failed.push('❌ GET /notifications/all failed: ' + getAllData.message);
      console.error('❌ Error:', getAllData.message);
    }
  } catch (error) {
    results.failed.push('❌ GET request failed: ' + error.message);
    console.error('❌ GET error:', error);
  }
  
  // Test 5: Test POST create notification
  console.log('\n%c[Test 5] Testing POST /notifications/create...', 'color: purple');
  try {
    const createRes = await fetch('http://localhost:3000/notifications/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Diagnostic Test Notification',
        message: 'This notification was created by the diagnostic script at ' + new Date().toLocaleTimeString(),
        type: 'info',
        priority: 'low',
        targetAudience: 'all'
      })
    });
    
    console.log('Response status:', createRes.status);
    const createData = await createRes.json();
    console.log('Response data:', createData);
    
    if (createData.success) {
      results.passed.push('✅ POST /notifications/create works');
      console.log('✅ Notification created successfully!');
      console.log('Notification ID:', createData.notification._id);
    } else {
      results.failed.push('❌ POST /notifications/create failed: ' + createData.message);
      console.error('❌ Error:', createData.message);
    }
  } catch (error) {
    results.failed.push('❌ POST request failed: ' + error.message);
    console.error('❌ POST error:', error);
  }
  
  // Test 6: Test GET my notifications
  console.log('\n%c[Test 6] Testing GET /notifications/my-notifications...', 'color: purple');
  try {
    const myNotifRes = await fetch('http://localhost:3000/notifications/my-notifications', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const myNotifData = await myNotifRes.json();
    
    console.log('Response status:', myNotifRes.status);
    console.log('Response data:', myNotifData);
    
    if (myNotifData.success) {
      results.passed.push('✅ GET /notifications/my-notifications works');
      console.log('✅ Found', myNotifData.notifications.length, 'notifications');
      console.log('Unread count:', myNotifData.unreadCount);
    } else {
      results.failed.push('❌ GET /notifications/my-notifications failed: ' + myNotifData.message);
      console.error('❌ Error:', myNotifData.message);
    }
  } catch (error) {
    results.failed.push('❌ GET my-notifications failed: ' + error.message);
    console.error('❌ Error:', error);
  }
  
  // Test 7: Check notification stats
  console.log('\n%c[Test 7] Testing GET /notifications/stats...', 'color: purple');
  try {
    const statsRes = await fetch('http://localhost:3000/notifications/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const statsData = await statsRes.json();
    
    console.log('Response status:', statsRes.status);
    console.log('Response data:', statsData);
    
    if (statsData.success) {
      results.passed.push('✅ GET /notifications/stats works');
      console.log('✅ Stats:', statsData.stats);
    } else {
      results.failed.push('❌ GET /notifications/stats failed: ' + statsData.message);
      console.error('❌ Error:', statsData.message);
    }
  } catch (error) {
    results.failed.push('❌ GET stats failed: ' + error.message);
    console.error('❌ Error:', error);
  }
  
  // Final Summary
  console.log('\n%c=== DIAGNOSTIC SUMMARY ===', 'color: blue; font-size: 16px; font-weight: bold');
  
  console.log('\n%c✅ PASSED (' + results.passed.length + '):', 'color: green; font-weight: bold');
  results.passed.forEach(item => console.log(item));
  
  if (results.warnings.length > 0) {
    console.log('\n%c⚠️ WARNINGS (' + results.warnings.length + '):', 'color: orange; font-weight: bold');
    results.warnings.forEach(item => console.log(item));
  }
  
  if (results.failed.length > 0) {
    console.log('\n%c❌ FAILED (' + results.failed.length + '):', 'color: red; font-weight: bold');
    results.failed.forEach(item => console.log(item));
    
    console.log('\n%c🔧 TROUBLESHOOTING STEPS:', 'color: orange; font-weight: bold');
    
    if (results.failed.some(f => f.includes('token'))) {
      console.log('1. You need to login first');
      console.log('   - Go to /login and login with admin credentials');
    }
    
    if (results.failed.some(f => f.includes('not admin'))) {
      console.log('2. Your user account needs admin role');
      console.log('   - Check MongoDB: db.usersDatas.findOne({email: "your-email"})');
      console.log('   - Update role: db.usersDatas.updateOne({email: "your-email"}, {$set: {role: "admin"}})');
    }
    
    if (results.failed.some(f => f.includes('server') || f.includes('connect'))) {
      console.log('3. Server is not running or not accessible');
      console.log('   - Start server: cd server && npm start');
      console.log('   - Check if running on http://localhost:3000');
    }
    
    if (results.failed.some(f => f.includes('POST') || f.includes('create'))) {
      console.log('4. Create notification endpoint has issues');
      console.log('   - Check server console for errors');
      console.log('   - Verify MongoDB is connected');
      console.log('   - Check notification schema is properly defined');
    }
  } else {
    console.log('\n%c🎉 ALL TESTS PASSED!', 'color: green; font-size: 16px; font-weight: bold');
    console.log('The notification system is working correctly.');
    console.log('If the UI button still doesn\'t work, check:');
    console.log('1. Browser console for JavaScript errors');
    console.log('2. React component is rendering correctly');
    console.log('3. Form submission is not being prevented');
  }
  
  console.log('\n%c=== END OF DIAGNOSTIC ===', 'color: blue; font-size: 16px; font-weight: bold');
  
  return {
    passed: results.passed.length,
    failed: results.failed.length,
    warnings: results.warnings.length,
    details: results
  };
})();
