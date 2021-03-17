import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { Activity } from '../models/Activity';
import { ActivityRepository } from '../repositories/ActivityRepository';

class activityController {

    async create(request: Request, response: Response) {
        let activity: Activity = request.body;

        const schema = yup.object().shape({
            trip_id: yup.string().required("Viagem é obrigatório!"),
            activity_type: yup.string().required("Tipo atividade obrigatório!"),
            name: yup.string().required("Nome obrigatório!"),
            start_hour: yup.date().required("Hora inicial é obrigatório!"),
            end_hour: yup.date().required("Hora final é obrigatório!"),
        })
        
        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error);
        }

        const activityRepository = getCustomRepository(ActivityRepository);

        activity = activityRepository.create(activity);

        await activityRepository.save(activity);

        return response.status(201).json(activity);
    }

    async show(request: Request, response: Response) {
        const activityRepository = getCustomRepository(ActivityRepository);

        const all = await activityRepository.find();

        return response.json(all);
    }
}

export { activityController };
