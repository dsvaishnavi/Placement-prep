import mongoose from "mongoose";
import { Schema } from "mongoose";

const moduleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { _id: true });

const coreConceptSchema = new Schema({
    conceptNumber: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        enum: ['Data Structures', 'Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks', 'System Design'],
        trim: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    modules: [moduleSchema],
    youtubeLink: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v) return true; // Optional field
                return /^https:\/\/(www\.)?youtube\.com\/watch\?v=/.test(v) || 
                       /^https:\/\/youtu\.be\//.test(v);
            },
            message: 'Please provide a valid YouTube URL'
        }
    },
    status: {
        type: String,
        enum: ['Draft', 'Published', 'Archived'],
        default: 'Draft'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'usersData',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'usersData'
    },
    tags: [{
        type: String,
        trim: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    viewCount: {
        type: Number,
        default: 0
    },
    lastViewedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Index for better query performance
coreConceptSchema.index({ subject: 1, difficulty: 1, status: 1 });
coreConceptSchema.index({ createdAt: -1 });
coreConceptSchema.index({ title: 'text', description: 'text' });

// Pre-save middleware to auto-generate concept number
coreConceptSchema.pre('save', async function() {
    if (this.isNew && !this.conceptNumber) {
        try {
            const lastConcept = await this.constructor.findOne(
                { isActive: true }, 
                { conceptNumber: 1 }, 
                { sort: { conceptNumber: -1 } }
            );
            
            this.conceptNumber = lastConcept ? lastConcept.conceptNumber + 1 : 1;
            console.log('Generated concept number:', this.conceptNumber);
        } catch (error) {
            console.error('Error generating concept number:', error);
            throw error;
        }
    }
});

// Virtual for module count
coreConceptSchema.virtual('moduleCount').get(function() {
    return this.modules ? this.modules.length : 0;
});

// Ensure virtual fields are serialized
coreConceptSchema.set('toJSON', { virtuals: true });

const CoreConcept = mongoose.model("CoreConcept", coreConceptSchema);

export default CoreConcept;