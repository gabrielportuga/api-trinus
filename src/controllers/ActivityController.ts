import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { Activity } from '../models/Activity';
import { ActivityRepository } from '../repositories/ActivityRepository';

class ActivityController {

    async create(request: Request, response: Response) {
        let activity: Activity = request.body;

        const schema = yup.object().shape({
            tripId: yup.string().required("Viagem é obrigatório!"),
            activityType: yup.string().required("Tipo atividade obrigatório!"),
            name: yup.string().required("Nome obrigatório!"),
            startHour: yup.date().required("Hora inicial é obrigatório!"),
            endHour: yup.date().required("Hora final é obrigatório!"),
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

    async getAll(request: Request, response: Response) {
        const activityRepository = getCustomRepository(ActivityRepository);

        const all = await activityRepository.find();

        return response.json(all);
    }

    async getTripActivities(request: Request, response: Response) {
        const { tripId } = request.params;

        const activityRepository = getCustomRepository(ActivityRepository);

        const all = await activityRepository.find({tripId});

        return response.json(all);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const activityRepository = getCustomRepository(ActivityRepository);

        const trip = await activityRepository.findOne(id);

        if (!trip) {
            throw new AppError("Trip does not exists!");
        }

        const results = await activityRepository.delete(id);

        return response.send(results);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const updatedActivity: Activity = request.body;
        const activityRepository = getCustomRepository(ActivityRepository);

        const activity = await activityRepository.findOne(id);

        if (!activity) {
            throw new AppError("Activity does not exists!");
        }

        activityRepository.merge(activity, updatedActivity);
        const results = await activityRepository.save(activity);
        return response.send(results);
    }
}

export { ActivityController };
