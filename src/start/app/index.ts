import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { AppError } from '../../errors/AppError';
import { router } from '../../routes';

export const createApp = () => {
    const app = express();
    app.use(express.json());
    app.use(router);
    app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                message: error.message
            })
        }
        return response.status(500).json({
            status: "Error",
            message: `Internal server error ${error.message}`
        })
    })
    app.listen(3000, () => console.log("Server started on port 3000! 🚀"));
}
