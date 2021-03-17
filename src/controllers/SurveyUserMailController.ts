import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';

class SurveyUserMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const user = await userRepository.findOne({ email });

        if (!user) {
            throw new AppError("User does not exists!");
        }

        const survey = await surveyRepository.findOne(survey_id);

        if (!survey) {
            throw new AppError("Survey does not exists!");
        }

        const surveyUserExists = await surveyUserRepository.findOne({
            where: { user_id: user.id , survey_id: survey_id, value: null },
            relations: ["user", "survey"]
        })

        const path = resolve(__dirname, "..", "templates", "emails", "npsMail.hbs");
        const variables =
        {
            name: user.name,
            title: survey.title,
            description: survey.description,
            survey_user_id: null,
            link: process.env.URL_MAIL
        }

        if (surveyUserExists) {
            variables.survey_user_id = surveyUserExists.id;
            await SendMailService.execute(email, survey.title, variables, path);
            return response.json(surveyUserExists);
        }

        const surveyUser = surveyUserRepository.create({
            user_id: user.id,
            survey_id
        });

        await surveyUserRepository.save(surveyUser);

        variables.survey_user_id = surveyUser.id

        await SendMailService.execute(email, survey.title, variables, path);

        return response.status(201).json(surveyUser);
    }
}

export { SurveyUserMailController };
