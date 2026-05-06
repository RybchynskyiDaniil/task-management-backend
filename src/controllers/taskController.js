import { Task } from '../models/Task.js';
// import createHttpError from 'http-errors';

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