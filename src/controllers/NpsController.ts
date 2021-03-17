import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class NpsController {

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveyUsers = await surveyUserRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        const totalDetractor = surveyUsers.filter(survey =>
            survey.value >= 0 && survey.value <= 6
        ).length;

        const totalPromoter = surveyUsers.filter(survey =>
            survey.value >= 9 && survey.value <= 10
        ).length;

        const totoalPassive = surveyUsers.filter(survey =>
            survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswers = surveyUsers.length;

        const NPS = Number(Number(((totalPromoter - totalDetractor) / totalAnswers) * 100).toFixed(2));

        return response.json({
            totalDetractor,
            totalPromoter,
            totoalPassive,
            totalAnswers,
            NPS
        });
    }
}

export { NpsController };
