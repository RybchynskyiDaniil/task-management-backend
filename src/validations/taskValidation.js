import { Joi, Segments } from 'celebrate';

export const createTaskSchema = {
    [Segments.BODY]: Joi.object({
        title: Joi.string().required().messages({
    'string.base': 'Title must be a string',
    'any.required': 'Title is required',
}),
        description:Joi.string(),
       priority: Joi.string().valid('low', 'medium', 'high').messages({
    'any.only': 'Priority must be low, medium or high',
}),
        dueDate:Joi.date()
})
};

export const updateTaskSchema = {
    [Segments.BODY]: Joi.object({
        title: Joi.string().messages({
    'string.base': 'Title must be a string',
    'any.required': 'Title is required',
}),
        description:Joi.string(),
        priority: Joi.string().valid('low', 'medium', 'high').messages({
    'any.only': 'Priority must be low, medium or high',
}),
        status:Joi.string().valid('pending', 'inProgress', 'completed'),
        dueDate:Joi.date()
})
};

export const getTasksSchema = {
    [Segments.QUERY]: Joi.object({
        page: Joi.number().integer().min(1).default(1),
        perPage: Joi.number().integer().min(5).max(20).default(10),
        status: Joi.string().valid('pending', 'inProgress', 'completed'),
        priority: Joi.string().valid('low', 'medium', 'high'),
        sortBy: Joi.string().valid('_id', 'title', 'createdAt', 'dueDate'),
        sortOrder: Joi.string().valid('asc', 'desc'),
        search: Joi.string().allow(""),
})    
};