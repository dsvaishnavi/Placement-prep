import express from "express";
import auth, { requireContentManager } from "../middleware/auth.js";
import AptitudeQuestion from "../models/aptitudeQuestionSchema.js";

const router = express.Router();

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
    const { page = 1, limit = 10, search = '', difficulty = '', status = '', topic = '' } = req.query;
    
    // Build search query
    const searchQuery = { isActive: true };
    
    if (search) {
      searchQuery.$or = [
        { question: { $regex: search, $options: 'i' } },
        { topic: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (difficulty) {
      searchQuery.difficulty = difficulty;
    }
    
    if (status) {
      searchQuery.status = status;
    }
    
    if (topic) {
      searchQuery.topic = { $regex: topic, $options: 'i' };
    }
    
    // Get questions with pagination
    const questions = await AptitudeQuestion
      .find(searchQuery)
      .populate('createdBy', 'name email')
      .populate('lastModifiedBy', 'name email')
      .sort({ questionNumber: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await AptitudeQuestion.countDocuments(searchQuery);

    res.status(200).json({
      success: true,
      questions,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
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
    const { question, options, correctAnswer, difficulty, topic, solution, tags, status } = req.body;

    // Validation
    if (!question || !options || !correctAnswer || !difficulty || !topic) {
      return res.status(400).json({
        success: false,
        message: "Question, options, correct answer, difficulty, and topic are required"
      });
    }

    if (!options.A || !options.B || !options.C || !options.D) {
      return res.status(400).json({
        success: false,
        message: "All four options (A, B, C, D) are required"
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

    // Create new question
    const newQuestion = new AptitudeQuestion({
      question: question.trim(),
      options: {
        A: options.A.trim(),
        B: options.B.trim(),
        C: options.C.trim(),
        D: options.D.trim()
      },
      correctAnswer,
      difficulty,
      topic: topic.trim(),
      solution: solution ? solution.trim() : '',
      tags: tags ? tags.map(tag => tag.trim()).filter(tag => tag.length > 0) : [],
      status: status || 'Draft',
      createdBy: req.user._id,
      lastModifiedBy: req.user._id
    });

    await newQuestion.save();

    // Populate the created question for response
    const populatedQuestion = await AptitudeQuestion
      .findById(newQuestion._id)
      .populate('createdBy', 'name email')
      .populate('lastModifiedBy', 'name email');

    res.status(201).json({
      success: true,
      message: "Aptitude question created successfully",
      question: populatedQuestion
    });

  } catch (error) {
    console.error("Create aptitude question error:", error);
    
    // Handle duplicate question number error (shouldn't happen with pre-save middleware)
    if (error.code === 11000 && error.keyPattern?.questionNumber) {
      return res.status(400).json({
        success: false,
        message: "Question number conflict. Please try again."
      });
    }
    
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
    const { question, options, correctAnswer, difficulty, topic, solution, tags, status } = req.body;

    // Find the question
    const existingQuestion = await AptitudeQuestion.findById(questionId);
    
    if (!existingQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    // Validation for provided fields
    if (correctAnswer && !['A', 'B', 'C', 'D'].includes(correctAnswer)) {
      return res.status(400).json({
        success: false,
        message: "Correct answer must be A, B, C, or D"
      });
    }

    if (difficulty && !['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: "Difficulty must be Easy, Medium, or Hard"
      });
    }

    if (status && !['Draft', 'Published', 'Archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Draft, Published, or Archived"
      });
    }

    // Build update object
    const updateData = {
      lastModifiedBy: req.user._id
    };

    if (question) updateData.question = question.trim();
    if (options) {
      updateData.options = {
        A: options.A ? options.A.trim() : existingQuestion.options.A,
        B: options.B ? options.B.trim() : existingQuestion.options.B,
        C: options.C ? options.C.trim() : existingQuestion.options.C,
        D: options.D ? options.D.trim() : existingQuestion.options.D
      };
    }
    if (correctAnswer) updateData.correctAnswer = correctAnswer;
    if (difficulty) updateData.difficulty = difficulty;
    if (topic) updateData.topic = topic.trim();
    if (solution !== undefined) updateData.solution = solution.trim();
    if (tags) updateData.tags = tags.map(tag => tag.trim()).filter(tag => tag.length > 0);
    if (status) updateData.status = status;

    // Update the question
    const updatedQuestion = await AptitudeQuestion.findByIdAndUpdate(
      questionId,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email').populate('lastModifiedBy', 'name email');

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

    // Soft delete by setting isActive to false
    const question = await AptitudeQuestion.findByIdAndUpdate(
      questionId,
      { 
        isActive: false,
        lastModifiedBy: req.user._id
      },
      { new: true }
    );
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

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

// Permanently delete aptitude question (Admin only)
router.delete("/aptitude-questions/:questionId/permanent", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only administrators can permanently delete questions"
      });
    }

    const { questionId } = req.params;

    const question = await AptitudeQuestion.findByIdAndDelete(questionId);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Question permanently deleted"
    });

  } catch (error) {
    console.error("Permanent delete aptitude question error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to permanently delete question"
    });
  }
});

// Get single aptitude question (Admin and Content Manager)
router.get("/aptitude-questions/:questionId", auth, requireContentManager, async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await AptitudeQuestion
      .findById(questionId)
      .populate('createdBy', 'name email')
      .populate('lastModifiedBy', 'name email');
    
    if (!question || !question.isActive) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    res.status(200).json({
      success: true,
      question
    });

  } catch (error) {
    console.error("Get aptitude question error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch question"
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
    // Get aptitude questions statistics
    const totalQuestions = await AptitudeQuestion.countDocuments({ isActive: true });
    const publishedQuestions = await AptitudeQuestion.countDocuments({ status: 'Published', isActive: true });
    const draftQuestions = await AptitudeQuestion.countDocuments({ status: 'Draft', isActive: true });
    const archivedQuestions = await AptitudeQuestion.countDocuments({ status: 'Archived', isActive: true });
    
    // Get questions by difficulty
    const easyQuestions = await AptitudeQuestion.countDocuments({ difficulty: 'Easy', isActive: true });
    const mediumQuestions = await AptitudeQuestion.countDocuments({ difficulty: 'Medium', isActive: true });
    const hardQuestions = await AptitudeQuestion.countDocuments({ difficulty: 'Hard', isActive: true });
    
    // Get popular topics
    const topicStats = await AptitudeQuestion.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const stats = {
      aptitudeQuestions: {
        total: totalQuestions,
        published: publishedQuestions,
        draft: draftQuestions,
        archived: archivedQuestions,
        byDifficulty: {
          easy: easyQuestions,
          medium: mediumQuestions,
          hard: hardQuestions
        },
        topTopics: topicStats.map(topic => ({
          name: topic._id,
          count: topic.count
        }))
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