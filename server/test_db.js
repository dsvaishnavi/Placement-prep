// Test database connection and aptitude question creation
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import the schema
import AptitudeQuestion from './models/aptitudeQuestionSchema.js';

const testDatabaseConnection = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('URI:', process.env.URI ? 'Found' : 'Not found');
    
    await mongoose.connect(process.env.URI);
    console.log('✅ Database connected successfully');

    // Test creating a question
    console.log('\n📝 Testing question creation...');
    
    const testQuestion = new AptitudeQuestion({
      question: 'What is 2 + 2?',
      options: {
        A: '3',
        B: '4',
        C: '5',
        D: '6'
      },
      correctAnswer: 'B',
      difficulty: 'Easy',
      topic: 'Basic Math',
      solution: '2 + 2 = 4',
      status: 'Draft',
      createdBy: new mongoose.Types.ObjectId() // Mock user ID
    });

    const savedQuestion = await testQuestion.save();
    console.log('✅ Question created successfully!');
    console.log('Question Number:', savedQuestion.questionNumber);
    console.log('Question ID:', savedQuestion._id);

    // Test fetching questions
    console.log('\n📋 Testing question retrieval...');
    const questions = await AptitudeQuestion.find({});
    console.log(`✅ Found ${questions.length} questions in database`);

    // Clean up - delete the test question
    await AptitudeQuestion.findByIdAndDelete(savedQuestion._id);
    console.log('🧹 Test question cleaned up');

    console.log('\n🎉 All database tests passed!');

  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Database disconnected');
  }
};

testDatabaseConnection();