import { Router } from 'express';
import { ActivityController } from './controllers/ActivityController';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SurveyController } from './controllers/SurveyController';
import { SurveyUserMailController } from './controllers/SurveyUserMailController';
import { TripController } from './controllers/TripController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const tripController = new TripController();
const activityController = new ActivityController();
const surveyController = new SurveyController();
const surveyUserMailController = new SurveyUserMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post("/users", userController.create);
router.post("/login", userController.login);

router.post("/trip", tripController.create);
router.get("/trip", tripController.getAll);
router.get("/trip/:userId", tripController.getUserTrips);
router.delete("/trip/:id", tripController.delete);
router.put("/trip/:id", tripController.update);

router.post("/activity", activityController.create);
router.get("/activity", activityController.getAll);
router.get("/activity/:userId", activityController.getTripActivities);
router.delete("/activity/:id", activityController.delete);
router.put("/activity/:id", activityController.update);

router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.getAll);

router.post("/sendMail", surveyUserMailController.execute);
router.get("/answers/:value", answerController.execute);
router.get("/nps/:surveyId", npsController.execute);

export { router };
