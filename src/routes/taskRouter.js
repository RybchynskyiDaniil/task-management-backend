import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { createTask, getTask, getTaskById, updatingTask, deletingTask } from '../controllers/taskController.js';
import { celebrate } from 'celebrate';
import { createTaskSchema, updateTaskSchema, getTasksSchema } from '../validations/taskValidation.js';

const taskRouter = Router();

taskRouter.use(authenticate);
taskRouter.post('/',celebrate(createTaskSchema), createTask);
taskRouter.get('/',celebrate(getTasksSchema), getTask);
taskRouter.get('/:taskId', getTaskById);
taskRouter.patch('/:taskId', celebrate(updateTaskSchema), updatingTask);
taskRouter.delete('/:taskId', deletingTask);
export default taskRouter;