import express from "express";
import AptitudeQuestion from "../models/aptitudeQuestionSchema.js";
import auth, { requireRole } from "../middleware/auth.js";

const router = express.Router();

// Get all aptitude questions with filtering and pagination (Admin and Content Manager)
router.get("/", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            search = '', 
            difficulty = '', 
            topic = '', 
            status = '',
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

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
        
        if (topic) {
            searchQuery.topic = { $regex: topic, $options: 'i' };
        }
        
        if (status) {
            searchQuery.status = status;
        }

        // Build sort object
        const sortObj = {};
        sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const questions = await AptitudeQuestion
            .find(searchQuery)
            .populate('createdBy', 'name email role')
            .populate('updatedBy', 'name email role')
            .sort(sortObj)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await AptitudeQuestion.countDocuments(searchQuery);

        res.status(200).json({
            success: true,
            questions,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total,
            hasNextPage: page < Math.ceil(total / limit),
            hasPrevPage: page > 1
        });

    } catch (error) {
        console.error("Get aptitude questions error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch aptitude questions"
        });
    }
});

// Get single aptitude question by ID (Admin and Content Manager)
router.get("/:id", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const question = await AptitudeQuestion
            .findById(req.params.id)
            .populate('createdBy', 'name email role')
            .populate('updatedBy', 'name email role');

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
        console.error("Get single question error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch question"
        });
    }
});

// Create new aptitude question (Admin and Content Manager)
router.post("/", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const {
            question,
            options,
            correctAnswer,
            difficulty,
            topic,
            solution,
            status,
            tags
        } = req.body;

        // Validation
        if (!question || !options || !correctAnswer || !difficulty || !topic) {
            return res.status(400).json({
                success: false,
                message: "Required fields: question, options, correctAnswer, difficulty, topic"
            });
        }

        // Validate options structure
        if (!options.A || !options.B || !options.C || !options.D) {
            return res.status(400).json({
                success: false,
                message: "All four options (A, B, C, D) are required"
            });
        }

        // Validate correct answer
        if (!['A', 'B', 'C', 'D'].includes(correctAnswer)) {
            return res.status(400).json({
                success: false,
                message: "Correct answer must be A, B, C, or D"
            });
        }

        console.log('Creating question with data:', {
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
            status: status || 'Draft',
            tags: tags || [],
            createdBy: req.user._id
        });

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
            status: status || 'Draft',
            tags: tags || [],
            createdBy: req.user._id
        });

        console.log('About to save question...');
        await newQuestion.save();
        console.log('Question saved successfully with number:', newQuestion.questionNumber);

        // Populate the created question for response
        const populatedQuestion = await AptitudeQuestion
            .findById(newQuestion._id)
            .populate('createdBy', 'name email role');

        res.status(201).json({
            success: true,
            message: "Aptitude question created successfully",
            question: populatedQuestion
        });

    } catch (error) {
        console.error("Create question error:", error);
        console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            code: error.code,
            name: error.name
        });
        
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Question number already exists"
            });
        }

        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation error: " + validationErrors.join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to create question: " + error.message
        });
    }
});

// Update aptitude question (Admin and Content Manager)
router.put("/:id", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const {
            question,
            options,
            correctAnswer,
            difficulty,
            topic,
            solution,
            status,
            tags
        } = req.body;

        const existingQuestion = await AptitudeQuestion.findById(req.params.id);
        
        if (!existingQuestion || !existingQuestion.isActive) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        // Validation
        if (options && (!options.A || !options.B || !options.C || !options.D)) {
            return res.status(400).json({
                success: false,
                message: "All four options (A, B, C, D) are required"
            });
        }

        if (correctAnswer && !['A', 'B', 'C', 'D'].includes(correctAnswer)) {
            return res.status(400).json({
                success: false,
                message: "Correct answer must be A, B, C, or D"
            });
        }

        // Update fields
        const updateData = {
            updatedBy: req.user._id
        };

        if (question) updateData.question = question.trim();
        if (options) {
            updateData.options = {
                A: options.A.trim(),
                B: options.B.trim(),
                C: options.C.trim(),
                D: options.D.trim()
            };
        }
        if (correctAnswer) updateData.correctAnswer = correctAnswer;
        if (difficulty) updateData.difficulty = difficulty;
        if (topic) updateData.topic = topic.trim();
        if (solution !== undefined) updateData.solution = solution.trim();
        if (status) updateData.status = status;
        if (tags) updateData.tags = tags;

        const updatedQuestion = await AptitudeQuestion
            .findByIdAndUpdate(req.params.id, updateData, { new: true })
            .populate('createdBy', 'name email role')
            .populate('updatedBy', 'name email role');

        res.status(200).json({
            success: true,
            message: "Question updated successfully",
            question: updatedQuestion
        });

    } catch (error) {
        console.error("Update question error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update question"
        });
    }
});

// Delete aptitude question (soft delete) (Admin and Content Manager)
router.delete("/:id", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const question = await AptitudeQuestion.findById(req.params.id);
        
        if (!question || !question.isActive) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        // Soft delete by setting isActive to false
        await AptitudeQuestion.findByIdAndUpdate(req.params.id, { 
            isActive: false,
            updatedBy: req.user._id
        });

        res.status(200).json({
            success: true,
            message: "Question deleted successfully"
        });

    } catch (error) {
        console.error("Delete question error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete question"
        });
    }
});

// Get aptitude questions statistics (Admin and Content Manager)
router.get("/stats/overview", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const totalQuestions = await AptitudeQuestion.countDocuments({ isActive: true });
        const publishedQuestions = await AptitudeQuestion.countDocuments({ status: 'Published', isActive: true });
        const draftQuestions = await AptitudeQuestion.countDocuments({ status: 'Draft', isActive: true });
        
        // Difficulty breakdown
        const easyQuestions = await AptitudeQuestion.countDocuments({ difficulty: 'Easy', isActive: true });
        const mediumQuestions = await AptitudeQuestion.countDocuments({ difficulty: 'Medium', isActive: true });
        const hardQuestions = await AptitudeQuestion.countDocuments({ difficulty: 'Hard', isActive: true });
        
        // Topic breakdown (top 10)
        const topicStats = await AptitudeQuestion.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$topic', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        // Recent questions (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentQuestions = await AptitudeQuestion.countDocuments({
            createdAt: { $gte: sevenDaysAgo },
            isActive: true
        });

        res.status(200).json({
            success: true,
            stats: {
                total: totalQuestions,
                published: publishedQuestions,
                draft: draftQuestions,
                byDifficulty: {
                    easy: easyQuestions,
                    medium: mediumQuestions,
                    hard: hardQuestions
                },
                topTopics: topicStats,
                recentlyAdded: recentQuestions
            }
        });

    } catch (error) {
        console.error("Get question stats error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch question statistics"
        });
    }
});

// Bulk update status (Admin and Content Manager)
router.patch("/bulk/status", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const { questionIds, status } = req.body;

        if (!questionIds || !Array.isArray(questionIds) || questionIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Question IDs array is required"
            });
        }

        if (!['Draft', 'Published'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be 'Draft' or 'Published'"
            });
        }

        const result = await AptitudeQuestion.updateMany(
            { _id: { $in: questionIds }, isActive: true },
            { 
                status,
                updatedBy: req.user._id
            }
        );

        res.status(200).json({
            success: true,
            message: `${result.modifiedCount} questions updated successfully`,
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        console.error("Bulk update error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update questions"
        });
    }
});

export default router;