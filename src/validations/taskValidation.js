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
