import { Router } from "express";
import * as controller from '../controllers/controllers.js';
import registerMail from '../controllers/mailer.js'
const router = Router();
import { localVariables } from "../middlewares/verify_token.js";

router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.authenticate);
router.route('/login').post(controller.verifyUser, controller.login);

router.route('/test').get(controller.test);
router.route('/user/:username').get(controller.getUsername);
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

router.route('/updateUser').put(controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);

export default router;