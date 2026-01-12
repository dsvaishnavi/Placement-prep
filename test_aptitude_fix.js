// Quick test to verify the aptitude questions API is working after the fix
const BASE_URL = 'http://localhost:3000';

// Test admin credentials (you may need to adjust these)
const testAdmin = {
  email: 'admin@test.com',
  password: 'admin123'
};

async function testAptitudeAPI() {
  try {
    console.log('🧪 Testing Aptitude Questions API after fix...\n');

    // Step 1: Login as admin to get token
    console.log('1. Logging in as admin...');
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testAdmin)
    });

    if (!loginResponse.ok) {
      console.log('❌ Admin login failed. Trying to create admin account...');
      
      // Try to create admin account
      const createAdminResponse = await fetch(`${BASE_URL}/auth/create-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Admin',
          email: testAdmin.email,
          password: testAdmin.password
        })
      });

      if (!createAdminResponse.ok) {
        throw new Error('Failed to create or login admin account');
      }

      const adminData = await createAdminResponse.json();
      var token = adminData.token;
      console.log('✅ Admin account created successfully');
    } else {
      const loginData = await loginResponse.json();
      var token = loginData.token;
      console.log('✅ Admin login successful');
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Step 2: Test creating a question
    console.log('\n2. Testing question creation...');
    const testQuestion = {
      question: 'What is 25% of 200?',
      options: {
        A: '25',
        B: '50',
        C: '75',
        D: '100'
      },
      correctAnswer: 'B',
      difficulty: 'Easy',
      topic: 'Percentage',
      solution: 'To find 25% of 200: (25/100) × 200 = 0.25 × 200 = 50',
      status: 'Published'
    };

    const createResponse = await fetch(`${BASE_URL}/aptitude`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testQuestion)
    });

    const createData = await createResponse.json();
    console.log('Create Response Status:', createResponse.status);
    console.log('Create Response Data:', createData);

    if (createResponse.ok) {
      console.log('✅ Question created successfully!');
      console.log('Question Number:', createData.question.questionNumber);
      
      // Step 3: Test getting questions
      console.log('\n3. Testing get questions...');
      const getResponse = await fetch(`${BASE_URL}/aptitude`, { headers });
      const getData = await getResponse.json();
      
      if (getResponse.ok) {
        console.log('✅ Questions retrieved successfully!');
        console.log('Total questions:', getData.total);
      } else {
        console.log('❌ Failed to get questions:', getData.message);
      }

      // Step 4: Test statistics
      console.log('\n4. Testing statistics...');
      const statsResponse = await fetch(`${BASE_URL}/aptitude/stats/overview`, { headers });
      const statsData = await statsResponse.json();
      
      if (statsResponse.ok) {
        console.log('✅ Statistics retrieved successfully!');
        console.log('Stats:', statsData.stats);
      } else {
        console.log('❌ Failed to get statistics:', statsData.message);
      }

    } else {
      console.log('❌ Question creation failed:', createData.message);
      console.log('Error details:', createData);
    }

    console.log('\n🎉 API test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n📝 Make sure:');
    console.log('1. Server is running on http://localhost:3000');
    console.log('2. Database is connected');
    console.log('3. Admin account exists or can be created');
  }
}

testAptitudeAPI();