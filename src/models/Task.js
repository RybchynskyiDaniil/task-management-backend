
import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        
    },
    status: {
        type: String, 
        enum: ['pending', 'inProgress', 'completed'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    dueDate: {
        type: Date,
        
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    {
        timestamps: true
    });

export const Task = mongoose.model('Task',taskSchema );