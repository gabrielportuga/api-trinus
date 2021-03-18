import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { Trip } from '../models/Trip';
import { TripRepository } from '../repositories/TripRepository';

class TripController {

    async create(request: Request, response: Response) {
        let trip: Trip = request.body;

        const schema = yup.object().shape({
            user_id: yup.string().required("Viajante é obrigatório!"),
            name: yup.string().required("Nome obrigatório!"),
            country: yup.string().required("País é obrigatório!"),
            start_date: yup.date().required("Data inicial é obrigatório!"),
            end_date: yup.date().required("Data final é obrigatório!"),
        })
        
        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error);
        }

        const tripRepository = getCustomRepository(TripRepository);

        trip = tripRepository.create(trip);

        await tripRepository.save(trip);

        return response.status(201).json(trip);
    }

    async getAll(request: Request, response: Response) {
        const tripRepository = getCustomRepository(TripRepository);

        const all = await tripRepository.find();

        return response.json(all);
    }

    async getUserTrips(request: Request, response: Response) {
        const { user_id } = request.params;

        const tripRepository = getCustomRepository(TripRepository);

        const all = await tripRepository.find({user_id});

        return response.json(all);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const tripRepository = getCustomRepository(TripRepository);

        const trip = await tripRepository.findOne(id);

        if (!trip) {
            throw new AppError("Trip does not exists!");
        }

        const results = await tripRepository.delete(id);

        return response.send(results);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const updatedTrip: Trip = request.body;
        const tripRepository = getCustomRepository(TripRepository);

        const trip = await tripRepository.findOne(id);

        if (!trip) {
            throw new AppError("Trip does not exists!");
        }

        tripRepository.merge(trip, updatedTrip);
        const results = await tripRepository.save(trip);
        return response.send(results);
    }

}

export { TripController };
