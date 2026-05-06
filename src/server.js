import express from "express";
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errors } from "celebrate";
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from './routes/authRouter.js';
import taskRouter from './routes/taskRouter.js';
import cookieParser from "cookie-parser";


const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});