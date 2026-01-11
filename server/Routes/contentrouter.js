import express from "express";
import auth, { requireContentManager } from "../middleware/auth.js";

const router = express.Router();

// Mock data for aptitude questions (replace with actual database models)
let aptitudeQuestions = [
  {
    id: 1,
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
    status: 'Published',
    createdBy: 'Admin',
    createdAt: new Date('2024-01-10')
  },
  {
    id: 2,
    question: 'If a train travels 300km in 3 hours, what is its speed?',
    options: {
      A: '80 km/h',
      B: '90 km/h',
      C: '100 km/h',
      D: '120 km/h'
    },
    correctAnswer: 'C',
    difficulty: 'Medium',
    topic: 'Speed & Time',
    status: 'Draft',
    createdBy: 'Content Manager',
    createdAt: new Date('2024-01-12')
  }
];

// Mock data for core concepts
let coreConcepts = [
  {
    id: 1,
    title: 'Data Structures - Arrays',
    description: 'Understanding array data structure, operations, and time complexity',
    subject: 'Data Structures',
    topics: 15,
    difficulty: 'Beginner',
    status: 'Published',
    lastUpdated: '2024-01-10',
    createdBy: 'Admin'
  },
  {
    id: 2,
    title: 'Operating Systems - Processes',
    description: 'Process management, scheduling algorithms, and synchronization',
    subject: 'Operating Systems',
    topics: 22,
    difficulty: 'Intermediate',
    status: 'Draft',
    lastUpdated: '2024-01-12',
    createdBy: 'Content Manager'
  }
];

// Get all aptitude questions (Admin and Content Manager)
router.get("/aptitude-questions", auth, requireContentManager, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', difficulty = '', status = '' } = req.query;
    
    let filteredQuestions = [...aptitudeQuestions];
    
    // Apply filters
    if (search) {
      filteredQuestions = filteredQuestions.filter(q => 
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.topic.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (difficulty) {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
    }
    
    if (status) {
      filteredQuestions = filteredQuestions.filter(q => q.status === status);
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex);
    
    res.status(200).json({
      success: true,
      questions: paginatedQuestions,
      totalPages: Math.ceil(filteredQuestions.length / limit),
      currentPage: parseInt(page),
      total: filteredQuestions.length
    });

  } catch (error) {
    console.error("Get aptitude questions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch aptitude questions"
    });
  }
});

// Create new aptitude question (Admin and Content Manager)
router.post("/aptitude-questions", auth, requireContentManager, async (req, res) => {
  try {
    const { question, options, correctAnswer, difficulty, topic } = req.body;

    if (!question || !options || !correctAnswer || !difficulty || !topic) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!['A', 'B', 'C', 'D'].includes(correctAnswer)) {
      return res.status(400).json({
        success: false,
        message: "Correct answer must be A, B, C, or D"
      });
    }

    if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: "Difficulty must be Easy, Medium, or Hard"
      });
    }

    const newQuestion = {
      id: aptitudeQuestions.length + 1,
      question,
      options,
      correctAnswer,
      difficulty,
      topic,
      status: 'Draft',
      createdBy: req.user.name,
      createdAt: new Date()
    };

    aptitudeQuestions.push(newQuestion);

    res.status(201).json({
      success: true,
      message: "Aptitude question created successfully",
      question: newQuestion
    });

  } catch (error) {
    console.error("Create aptitude question error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create aptitude question"
    });
  }
});

// Update aptitude question (Admin and Content Manager)
router.put("/aptitude-questions/:questionId", auth, requireContentManager, async (req, res) => {
  try {
    const { questionId } = req.params;
    const { question, options, correctAnswer, difficulty, topic, status } = req.body;

    const questionIndex = aptitudeQuestions.findIndex(q => q.id === parseInt(questionId));
    
    if (questionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    // Update the question
    const updatedQuestion = {
      ...aptitudeQuestions[questionIndex],
      ...(question && { question }),
      ...(options && { options }),
      ...(correctAnswer && { correctAnswer }),
      ...(difficulty && { difficulty }),
      ...(topic && { topic }),
      ...(status && { status }),
      lastUpdated: new Date()
    };

    aptitudeQuestions[questionIndex] = updatedQuestion;

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question: updatedQuestion
    });

  } catch (error) {
    console.error("Update aptitude question error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update question"
    });
  }
});

// Delete aptitude question (Admin and Content Manager)
router.delete("/aptitude-questions/:questionId", auth, requireContentManager, async (req, res) => {
  try {
    const { questionId } = req.params;

    const questionIndex = aptitudeQuestions.findIndex(q => q.id === parseInt(questionId));
    
    if (questionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    aptitudeQuestions.splice(questionIndex, 1);

    res.status(200).json({
      success: true,
      message: "Question deleted successfully"
    });

  } catch (error) {
    console.error("Delete aptitude question error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete question"
    });
  }
});

// Get all core concepts (Admin and Content Manager)
router.get("/core-concepts", auth, requireContentManager, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', subject = '', difficulty = '', status = '' } = req.query;
    
    let filteredConcepts = [...coreConcepts];
    
    // Apply filters
    if (search) {
      filteredConcepts = filteredConcepts.filter(c => 
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (subject) {
      filteredConcepts = filteredConcepts.filter(c => c.subject === subject);
    }
    
    if (difficulty) {
      filteredConcepts = filteredConcepts.filter(c => c.difficulty === difficulty);
    }
    
    if (status) {
      filteredConcepts = filteredConcepts.filter(c => c.status === status);
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedConcepts = filteredConcepts.slice(startIndex, endIndex);
    
    res.status(200).json({
      success: true,
      concepts: paginatedConcepts,
      totalPages: Math.ceil(filteredConcepts.length / limit),
      currentPage: parseInt(page),
      total: filteredConcepts.length
    });

  } catch (error) {
    console.error("Get core concepts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch core concepts"
    });
  }
});

// Create new core concept (Admin and Content Manager)
router.post("/core-concepts", auth, requireContentManager, async (req, res) => {
  try {
    const { title, description, subject, difficulty } = req.body;

    if (!title || !description || !subject || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!['Beginner', 'Intermediate', 'Advanced'].includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: "Difficulty must be Beginner, Intermediate, or Advanced"
      });
    }

    const newConcept = {
      id: coreConcepts.length + 1,
      title,
      description,
      subject,
      topics: 0, // Default value
      difficulty,
      status: 'Draft',
      lastUpdated: new Date().toISOString().split('T')[0],
      createdBy: req.user.name
    };

    coreConcepts.push(newConcept);

    res.status(201).json({
      success: true,
      message: "Core concept created successfully",
      concept: newConcept
    });

  } catch (error) {
    console.error("Create core concept error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create core concept"
    });
  }
});

// Update core concept (Admin and Content Manager)
router.put("/core-concepts/:conceptId", auth, requireContentManager, async (req, res) => {
  try {
    const { conceptId } = req.params;
    const { title, description, subject, difficulty, status, topics } = req.body;

    const conceptIndex = coreConcepts.findIndex(c => c.id === parseInt(conceptId));
    
    if (conceptIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Concept not found"
      });
    }

    // Update the concept
    const updatedConcept = {
      ...coreConcepts[conceptIndex],
      ...(title && { title }),
      ...(description && { description }),
      ...(subject && { subject }),
      ...(difficulty && { difficulty }),
      ...(status && { status }),
      ...(topics !== undefined && { topics }),
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    coreConcepts[conceptIndex] = updatedConcept;

    res.status(200).json({
      success: true,
      message: "Concept updated successfully",
      concept: updatedConcept
    });

  } catch (error) {
    console.error("Update core concept error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update concept"
    });
  }
});

// Delete core concept (Admin and Content Manager)
router.delete("/core-concepts/:conceptId", auth, requireContentManager, async (req, res) => {
  try {
    const { conceptId } = req.params;

    const conceptIndex = coreConcepts.findIndex(c => c.id === parseInt(conceptId));
    
    if (conceptIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Concept not found"
      });
    }

    coreConcepts.splice(conceptIndex, 1);

    res.status(200).json({
      success: true,
      message: "Concept deleted successfully"
    });

  } catch (error) {
    console.error("Delete core concept error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete concept"
    });
  }
});

// Get content statistics (Admin and Content Manager)
router.get("/stats", auth, requireContentManager, async (req, res) => {
  try {
    const stats = {
      aptitudeQuestions: {
        total: aptitudeQuestions.length,
        published: aptitudeQuestions.filter(q => q.status === 'Published').length,
        draft: aptitudeQuestions.filter(q => q.status === 'Draft').length,
        byDifficulty: {
          easy: aptitudeQuestions.filter(q => q.difficulty === 'Easy').length,
          medium: aptitudeQuestions.filter(q => q.difficulty === 'Medium').length,
          hard: aptitudeQuestions.filter(q => q.difficulty === 'Hard').length
        }
      },
      coreConcepts: {
        total: coreConcepts.length,
        published: coreConcepts.filter(c => c.status === 'Published').length,
        draft: coreConcepts.filter(c => c.status === 'Draft').length,
        byDifficulty: {
          beginner: coreConcepts.filter(c => c.difficulty === 'Beginner').length,
          intermediate: coreConcepts.filter(c => c.difficulty === 'Intermediate').length,
          advanced: coreConcepts.filter(c => c.difficulty === 'Advanced').length
        }
      }
    };

    res.status(200).json({
      success: true,
      stats
    });

  } catch (error) {
    console.error("Get content stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch content statistics"
    });
  }
});

export default router;