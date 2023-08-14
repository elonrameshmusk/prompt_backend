import { Router } from "express";
import * as auth_controller from '../controllers/auth_controller.js';
import * as days_controller from '../controllers/days_controller.js';
// import registerMail from '../controllers/mailer.js'
const router = Router();
import { localVariables } from "../middlewares/verify_token.js";
//AUTH ROUTES
//post routes
router.route('/register').post(auth_controller.register);
// router.route('/registerMail').post(registerMail);
router.route('/authorize').post(auth_controller.authorize);
router.route('/login').post(auth_controller.verifyUser, auth_controller.login);
//get routes
router.route('/test').get(auth_controller.test);
router.route('/user/:username').get(auth_controller.getUsername);
router.route('/generateOTP').get(auth_controller.verifyUser, localVariables, auth_controller.generateOTP);
router.route('/verifyOTP').get(auth_controller.verifyUser, auth_controller.verifyOTP);
router.route('/createResetSession').get(auth_controller.createResetSession);
//put routes
router.route('/updateUser').put(auth_controller.updateUser); 
router.route('/resetPassword').put(auth_controller.verifyUser, auth_controller.resetPassword);
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