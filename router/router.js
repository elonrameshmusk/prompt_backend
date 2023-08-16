import { Router } from "express";
import * as auth_controller from '../controllers/auth_controller.js';
import * as prompts_controller from '../controllers/prompts_controller.js';
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
//PROMPT ROUTES
//post routes
router.route('/createPrompt').post(auth_controller.authorize, prompts_controller.createPrompt);
//get routes
router.route('/getPrompt').get(auth_controller.authorize, prompts_controller.getPrompt);
//put routes
router.route('/putPrompt').put(auth_controller.authorize, prompts_controller.putPrompt);
//delete routes
router.route('/deletePrompt').delete(auth_controller.authorize, prompts_controller.deletePrompt);
export default router;