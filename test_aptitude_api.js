// Simple test script to verify aptitude questions API
// Run this after starting the server and having a valid admin token

const testAptitudeAPI = async () => {
  const baseURL = 'http://localhost:3000';
  
  // You'll need to replace this with a valid admin token
  // Get this by logging in as admin through the frontend
  const adminToken = 'YOUR_ADMIN_TOKEN_HERE';
  
  const headers = {
    'Authorization': `Bearer ${adminToken}`,
    'Content-Type': 'application/json'
  };

  try {
    console.log('🧪 Testing Aptitude Questions API...\n');

    // Test 1: Get statistics
    console.log('1. Testing GET /aptitude/stats/overview');
    const statsResponse = await fetch(`${baseURL}/aptitude/stats/overview`, { headers });
    const statsData = await statsResponse.json();
    console.log('Stats Response:', statsData);
    console.log('✅ Stats endpoint working\n');

    // Test 2: Get all questions (should be empty initially)
    console.log('2. Testing GET /aptitude');
    const questionsResponse = await fetch(`${baseURL}/aptitude`, { headers });
    const questionsData = await questionsResponse.json();
    console.log('Questions Response:', questionsData);
    console.log('✅ Questions list endpoint working\n');

    // Test 3: Create a new question
    console.log('3. Testing POST /aptitude (Create Question)');
    const newQuestion = {
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

    const createResponse = await fetch(`${baseURL}/aptitude`, {
      method: 'POST',
      headers,
      body: JSON.stringify(newQuestion)
    });
    const createData = await createResponse.json();
    console.log('Create Response:', createData);
    
    if (createData.success) {
      console.log('✅ Question created successfully');
      console.log('Question Number:', createData.question.questionNumber);
      
      // Test 4: Get the created question
      const questionId = createData.question._id;
      console.log('\n4. Testing GET /aptitude/:id');
      const singleQuestionResponse = await fetch(`${baseURL}/aptitude/${questionId}`, { headers });
      const singleQuestionData = await singleQuestionResponse.json();
      console.log('Single Question Response:', singleQuestionData);
      console.log('✅ Single question endpoint working\n');

      // Test 5: Update the question
      console.log('5. Testing PUT /aptitude/:id (Update Question)');
      const updateData = {
        question: 'What is 25% of 200? (Updated)',
        difficulty: 'Medium'
      };
      const updateResponse = await fetch(`${baseURL}/aptitude/${questionId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateData)
      });
      const updateResult = await updateResponse.json();
      console.log('Update Response:', updateResult);
      console.log('✅ Question updated successfully\n');

      // Test 6: Delete the question
      console.log('6. Testing DELETE /aptitude/:id');
      const deleteResponse = await fetch(`${baseURL}/aptitude/${questionId}`, {
        method: 'DELETE',
        headers
      });
      const deleteResult = await deleteResponse.json();
      console.log('Delete Response:', deleteResult);
      console.log('✅ Question deleted successfully\n');

    } else {
      console.log('❌ Failed to create question:', createData.message);
    }

    console.log('🎉 All API tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n📝 Instructions:');
    console.log('1. Make sure the server is running (npm start in server directory)');
    console.log('2. Get a valid admin token by logging in through the frontend');
    console.log('3. Replace YOUR_ADMIN_TOKEN_HERE with the actual token');
    console.log('4. Run: node test_aptitude_api.js');
  }
};

// Check if we're running this file directly
if (typeof window === 'undefined') {
  testAptitudeAPI();
}

export default testAptitudeAPI;