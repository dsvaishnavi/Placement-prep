import mongoose from "mongoose";
import { Schema } from "mongoose";

const aptitudeQuestionSchema = new Schema({
    questionNumber: {
        type: Number,
        unique: true
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        A: {
            type: String,
            required: true,
            trim: true
        },
        B: {
            type: String,
            required: true,
            trim: true
        },
        C: {
            type: String,
            required: true,
            trim: true
        },
        D: {
            type: String,
            required: true,
            trim: true
        }
    },
    correctAnswer: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D']
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    solution: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: ['Draft', 'Published'],
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
    }
}, {
    timestamps: true
});

// Index for better query performance
aptitudeQuestionSchema.index({ topic: 1, difficulty: 1, status: 1 });
aptitudeQuestionSchema.index({ createdAt: -1 });

// Pre-save middleware to auto-generate question number
aptitudeQuestionSchema.pre('save', async function() {
    if (this.isNew && !this.questionNumber) {
        try {
            // Use a more robust approach to get the next question number
            const lastQuestion = await this.constructor.findOne(
                { isActive: true }, 
                { questionNumber: 1 }, 
                { sort: { questionNumber: -1 } }
            );
            
            this.questionNumber = lastQuestion ? lastQuestion.questionNumber + 1 : 1;
            console.log('Generated question number:', this.questionNumber);
        } catch (error) {
            console.error('Error generating question number:', error);
            throw error;
        }
    }
});

const AptitudeQuestion = mongoose.model("AptitudeQuestion", aptitudeQuestionSchema);

export default AptitudeQuestion;