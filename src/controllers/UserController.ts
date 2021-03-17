import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../repositories/UserRepository';
import { CryptoService } from '../services/CryptoService';

class UserController {

    async create(request: Request, response: Response) {
        let { name, email, password } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatório!"),
            email: yup.string().email("Email incorreto!").required("Email obrigatório!"),
            password: yup.string().required("Password é obrigatório!"),
        })
        
        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error);
        }

        try {
            const userRepository = getCustomRepository(UserRepository);

            let user = await userRepository.findOne({
                email
            });

            if (user) {
                throw new AppError("User already exists!");
            }

            const cryptoService = new CryptoService();
            password = await cryptoService.generateHash(password);

            user = userRepository.create({
                name, email, password
            });

            await userRepository.save(user);

            delete user.password;

            return response.status(201).json(user);
            
        } catch (error) {
            throw new AppError(error);
        }
    }

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const schema = yup.object().shape({
            email: yup.string().email("Email incorreto!").required("Email obrigatório!"),
            password: yup.string().required("Password é obrigatório!"),
        })
        
        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error);
        }

        try {
            const userRepository = getCustomRepository(UserRepository);
            let user = await userRepository.findOne({
                email
            });
          
            if (!user) {
                throw new AppError("User not exists!");
            }

            const cryptoService = new CryptoService();    
            const passwordOk = await cryptoService.compareHash(password, user.password);

            if (passwordOk) {
                delete user.password;
                const jwt = require('jsonwebtoken');
                const accessToken = await jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET)
                user = Object.assign(user, { accessToken: accessToken })
                return response.status(201).json(user);
            }
            else {
                throw new AppError("Invalid user or password!");
            }
            
        } catch (error) {
            throw new AppError(error);
        }
    }
}

export { UserController };
