import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { createTask } from '../controllers/taskController.js';

const taskRouter = Router();

taskRouter.use(authenticate);
taskRouter.post('/', createTask);

export default taskRouter;