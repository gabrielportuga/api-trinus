import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SurveyController } from './controllers/SurveyController';
import { SurveyUserMailController } from './controllers/SurveyUserMailController';
import { TripController } from './controllers/TripController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const tripController = new TripController();
const surveyController = new SurveyController();
const surveyUserMailController = new SurveyUserMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post("/users", userController.create);
router.post("/login", userController.login);

router.post("/trip", tripController.create);
router.get("/trip", tripController.show);

router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.show);


router.post("/sendMail", surveyUserMailController.execute);
router.get("/answers/:value", answerController.execute);
router.get("/nps/:survey_id", npsController.execute);

export { router };
