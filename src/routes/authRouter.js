import { Router } from 'express';
import { celebrate } from 'celebrate';
import { register, login } from '../controllers/authController.js';
import { registerUserSchema , loginUserSchema  } from '../validations/userValidation.js';


const authRouter = Router();
authRouter.post('/register', celebrate(registerUserSchema), register);
authRouter.post('/login', celebrate(loginUserSchema), login);


export default authRouter;