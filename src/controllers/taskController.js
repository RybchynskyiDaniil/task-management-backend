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
    const { page = 1, perPage = 10, status, priority, sortBy = '_id', sortOrder = 'asc', search } = req.query;
    const skip = (page - 1) * perPage;
    const userId = req.user._id;
    const tasksQuery = Task.find({ userId });
    if (status) tasksQuery.where('status').equals(status);
    if (priority) tasksQuery.where('priority').equals(priority);
    if (search) tasksQuery.where({ title: { $regex: search, $options: 'i' } });

    const [totalItems, tasks] = await Promise.all([
    tasksQuery.clone().countDocuments(),
    tasksQuery.skip(skip).limit(Number(perPage)).sort({[sortBy]:sortOrder}),
    ]);
    const totalPages = Math.ceil(totalItems / perPage);
    res.status(200).json({ page, perPage, totalItems, totalPages, tasks });   
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