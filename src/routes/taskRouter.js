import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { createTask, getTask, getTaskById, updatingTask, deletingTask } from '../controllers/taskController.js';

const taskRouter = Router();

taskRouter.use(authenticate);
taskRouter.post('/', createTask);
taskRouter.get('/', getTask);
taskRouter.get('/:taskId', getTaskById);
taskRouter.patch('/:taskId', updatingTask);
taskRouter.delete('/:taskId', deletingTask);
export default taskRouter;