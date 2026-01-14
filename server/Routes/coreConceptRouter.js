import express from "express";
import CoreConcept from "../models/coreConceptSchema.js";
import auth, { requireRole } from "../middleware/auth.js";

const router = express.Router();

// Get all core concepts with filtering and pagination (Admin and Content Manager)
router.get("/", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            search = '', 
            difficulty = '', 
            subject = '', 
            status = '',
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        // Build search query
        const searchQuery = { isActive: true };
        
        if (search) {
            searchQuery.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }
        
        if (difficulty) {
            searchQuery.difficulty = difficulty;
        }
        
        if (subject) {
            searchQuery.subject = subject;
        }
        
        if (status) {
            searchQuery.status = status;
        }

        // Build sort object
        const sortObj = {};
        sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const concepts = await CoreConcept
            .find(searchQuery)
            .populate('createdBy', 'name email role')
            .populate('updatedBy', 'name email role')
            .sort(sortObj)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await CoreConcept.countDocuments(searchQuery);

        res.status(200).json({
            success: true,
            concepts,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total,
            hasNextPage: page < Math.ceil(total / limit),
            hasPrevPage: page > 1
        });

    } catch (error) {
        console.error("Get core concepts error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch core concepts"
        });
    }
});

// Get single core concept by ID (Admin and Content Manager)
router.get("/:id", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const concept = await CoreConcept
            .findById(req.params.id)
            .populate('createdBy', 'name email role')
            .populate('updatedBy', 'name email role');

        if (!concept || !concept.isActive) {
            return res.status(404).json({
                success: false,
                message: "Core concept not found"
            });
        }

        // Increment view count
        await CoreConcept.findByIdAndUpdate(req.params.id, {
            $inc: { viewCount: 1 },
            lastViewedAt: new Date()
        });

        res.status(200).json({
            success: true,
            concept
        });

    } catch (error) {
        console.error("Get single concept error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch core concept"
        });
    }
});

// Create new core concept (Admin and Content Manager)
router.post("/", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const {
            title,
            description,
            subject,
            difficulty,
            modules,
            youtubeLink,
            status,
            tags
        } = req.body;

        // Validation
        if (!title || !description || !subject || !difficulty) {
            return res.status(400).json({
                success: false,
                message: "Required fields: title, description, subject, difficulty"
            });
        }

        // Validate and filter modules if provided
        let validModules = [];
        if (modules && Array.isArray(modules)) {
            validModules = modules.filter(module => {
                // Only include modules that have both title and content
                return module.title && module.title.trim() !== '' && 
                       module.content && module.content.trim() !== '';
            });
            
            // Validate that filtered modules have proper structure
            for (let i = 0; i < validModules.length; i++) {
                const module = validModules[i];
                if (!module.title || !module.content) {
                    return res.status(400).json({
                        success: false,
                        message: `Module ${i + 1}: title and content are required`
                    });
                }
            }
        }

        console.log('Creating core concept with data:', {
            title: title.trim(),
            description: description.trim(),
            subject,
            difficulty,
            modules: validModules,
            youtubeLink: youtubeLink ? youtubeLink.trim() : '',
            status: status || 'Draft',
            tags: tags || [],
            createdBy: req.user._id
        });

        // Create new core concept
        const newConcept = new CoreConcept({
            title: title.trim(),
            description: description.trim(),
            subject,
            difficulty,
            modules: validModules.map((module, index) => ({
                title: module.title.trim(),
                content: module.content.trim(),
                order: index
            })),
            youtubeLink: youtubeLink ? youtubeLink.trim() : '',
            status: status || 'Draft',
            tags: tags || [],
            createdBy: req.user._id,
            isActive: true  // Explicitly set to true
        });

        console.log('About to save core concept...');
        await newConcept.save();
        console.log('Core concept saved successfully with number:', newConcept.conceptNumber);

        // Populate the created concept for response
        const populatedConcept = await CoreConcept
            .findById(newConcept._id)
            .populate('createdBy', 'name email role');

        res.status(201).json({
            success: true,
            message: "Core concept created successfully",
            concept: populatedConcept
        });

    } catch (error) {
        console.error("Create concept error:", error);
        console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            code: error.code,
            name: error.name
        });
        
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Concept number already exists"
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
            message: "Failed to create core concept: " + error.message
        });
    }
});

// Update core concept (Admin and Content Manager)
router.put("/:id", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const {
            title,
            description,
            subject,
            difficulty,
            modules,
            youtubeLink,
            status,
            tags
        } = req.body;

        const existingConcept = await CoreConcept.findById(req.params.id);
        
        if (!existingConcept || !existingConcept.isActive) {
            return res.status(404).json({
                success: false,
                message: "Core concept not found"
            });
        }

        // Validate and filter modules if provided
        let validModules = [];
        if (modules && Array.isArray(modules)) {
            validModules = modules.filter(module => {
                // Only include modules that have both title and content
                return module.title && module.title.trim() !== '' && 
                       module.content && module.content.trim() !== '';
            });
            
            // Validate that filtered modules have proper structure
            for (let i = 0; i < validModules.length; i++) {
                const module = validModules[i];
                if (!module.title || !module.content) {
                    return res.status(400).json({
                        success: false,
                        message: `Module ${i + 1}: title and content are required`
                    });
                }
            }
        }

        // Update fields
        const updateData = {
            updatedBy: req.user._id
        };

        if (title) updateData.title = title.trim();
        if (description) updateData.description = description.trim();
        if (subject) updateData.subject = subject;
        if (difficulty) updateData.difficulty = difficulty;
        if (modules !== undefined) {
            updateData.modules = validModules.map((module, index) => ({
                title: module.title.trim(),
                content: module.content.trim(),
                order: index
            }));
        }
        if (youtubeLink !== undefined) updateData.youtubeLink = youtubeLink.trim();
        if (status) updateData.status = status;
        if (tags) updateData.tags = tags;

        const updatedConcept = await CoreConcept
            .findByIdAndUpdate(req.params.id, updateData, { new: true })
            .populate('createdBy', 'name email role')
            .populate('updatedBy', 'name email role');

        res.status(200).json({
            success: true,
            message: "Core concept updated successfully",
            concept: updatedConcept
        });

    } catch (error) {
        console.error("Update concept error:", error);
        
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation error: " + validationErrors.join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update core concept"
        });
    }
});

// Delete core concept (soft delete) (Admin and Content Manager)
router.delete("/:id", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const concept = await CoreConcept.findById(req.params.id);
        
        if (!concept || !concept.isActive) {
            return res.status(404).json({
                success: false,
                message: "Core concept not found"
            });
        }

        // Soft delete by setting isActive to false
        await CoreConcept.findByIdAndUpdate(req.params.id, { 
            isActive: false,
            updatedBy: req.user._id
        });

        res.status(200).json({
            success: true,
            message: "Core concept deleted successfully"
        });

    } catch (error) {
        console.error("Delete concept error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete core concept"
        });
    }
});

// Get core concepts statistics (Admin and Content Manager)
router.get("/stats/overview", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const totalConcepts = await CoreConcept.countDocuments({ isActive: true });
        const publishedConcepts = await CoreConcept.countDocuments({ status: 'Published', isActive: true });
        const draftConcepts = await CoreConcept.countDocuments({ status: 'Draft', isActive: true });
        const archivedConcepts = await CoreConcept.countDocuments({ status: 'Archived', isActive: true });
        
        // Difficulty breakdown
        const beginnerConcepts = await CoreConcept.countDocuments({ difficulty: 'Beginner', isActive: true });
        const intermediateConcepts = await CoreConcept.countDocuments({ difficulty: 'Intermediate', isActive: true });
        const advancedConcepts = await CoreConcept.countDocuments({ difficulty: 'Advanced', isActive: true });
        
        // Subject breakdown
        const subjectStats = await CoreConcept.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$subject', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Recent concepts (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentConcepts = await CoreConcept.countDocuments({
            createdAt: { $gte: sevenDaysAgo },
            isActive: true
        });

        // Most viewed concepts
        const mostViewed = await CoreConcept.find({ isActive: true })
            .sort({ viewCount: -1 })
            .limit(5)
            .select('title viewCount subject difficulty');

        res.status(200).json({
            success: true,
            stats: {
                total: totalConcepts,
                published: publishedConcepts,
                draft: draftConcepts,
                archived: archivedConcepts,
                byDifficulty: {
                    beginner: beginnerConcepts,
                    intermediate: intermediateConcepts,
                    advanced: advancedConcepts
                },
                bySubject: subjectStats,
                recentlyAdded: recentConcepts,
                mostViewed: mostViewed
            }
        });

    } catch (error) {
        console.error("Get concept stats error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch core concept statistics"
        });
    }
});

// Bulk update status (Admin and Content Manager)
router.patch("/bulk/status", auth, requireRole(['admin', 'content-manager']), async (req, res) => {
    try {
        const { conceptIds, status } = req.body;

        if (!conceptIds || !Array.isArray(conceptIds) || conceptIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Concept IDs array is required"
            });
        }

        if (!['Draft', 'Published', 'Archived'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be 'Draft', 'Published', or 'Archived'"
            });
        }

        const result = await CoreConcept.updateMany(
            { _id: { $in: conceptIds }, isActive: true },
            { 
                status,
                updatedBy: req.user._id
            }
        );

        res.status(200).json({
            success: true,
            message: `${result.modifiedCount} core concepts updated successfully`,
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        console.error("Bulk update error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update core concepts"
        });
    }
});

export default router;