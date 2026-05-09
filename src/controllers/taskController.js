import { Task } from '../models/Task.js';
import createHttpError from 'http-errors';

export const createTask = async (req, res) => {
    const { title, description, priority, dueDate } = req.body;
    const userId = req.user._id;
    const task = await Task.create({
        title,
        description,
        priority,
        dueDate,
        userId,
    });
    res.status(201).json(task);
};

export const getTask = async (req, res) => {
    const userId = req.user._id;
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);   
};

export const getTaskById = async (req, res) => {
    const { taskId } = req.params;
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });
    if (!task) {
        throw createHttpError(404, 'Task not found ');   
    };
    res.status(200).json(task);
};

export const updatingTask = async (req, res) => {
    const { taskId } = req.params;
    const  userId  = req.user._id;
    const updateTask = await Task.findOneAndUpdate({ _id: taskId, userId }, req.body, { returnDocument: 'after' });
    if (!updateTask) {
    throw createHttpError (404,'Task not found '); 
    };
    res.status(200).json(updateTask);
    
};

export const deletingTask = async (req, res) => {
    const { taskId } = req.params;
    const userId = req.user._id;
    const deleteTask = await Task.findOneAndDelete({ _id: taskId, userId });
    if (!deleteTask) {
        throw createHttpError(404, 'Task not found');   
    }
    res.status(200).json(deleteTask);
};