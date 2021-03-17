import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatório!"),
            email: yup.string().email("Email incorreto!").required("Email obrigatório!")
        })

        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error);
        }

        try {
            const userRepository = getCustomRepository(UserRepository);

            const userAlreadyExists = await userRepository.findOne({
                email
            });

            if (userAlreadyExists) {
                throw new AppError("User already exists!");
            }


            const user = userRepository.create({
                name, email
            });

            await userRepository.save(user);

            return response.status(201).json(user);
        } catch (error) {
            throw new AppError(error);
        }
    }
}

export { UserController };
