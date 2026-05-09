import { Router } from 'express';
import { celebrate } from 'celebrate';
import { register, login, logout, refreshUserSession } from '../controllers/authController.js';
import { registerUserSchema , loginUserSchema  } from '../validations/userValidation.js';


const authRouter = Router();
authRouter.post('/register', celebrate(registerUserSchema), register);
authRouter.post('/login', celebrate(loginUserSchema), login);
authRouter.post('/logout', logout);
authRouter.post('/refresh', refreshUserSession);



export default authRouter;