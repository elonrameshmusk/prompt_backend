import { Router } from "express";
import * as controller from '../controllers/auth_controller.js';
import * as days_controller from '../controllers/days_controller.js';
import registerMail from '../controllers/mailer.js'
const router = Router();
import { localVariables } from "../middlewares/verify_token.js";
//AUTH ROUTES
//post routes
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.authenticate);
router.route('/login').post(controller.verifyUser, controller.login);
//get routes
router.route('/test').get(controller.test);
router.route('/user/:username').get(controller.getUsername);
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);
//put routes
router.route('/updateUser').put(controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);
//DAY ROUTES
//post routes

//get routes
router.route('/getAllDays').get(days_controller.decodeToken, days_controller.getAllDays);
//put routes
router.route('/putDay').put(days_controller.decodeToken, days_controller.putDay);
// router.route('/updateDay').put(days_controller.decodeToken, days_controller.updateDay);
//delete routes
router.route('/deleteDay').delete(days_controller.decodeToken, days_controller.deleteDay);
export default router;