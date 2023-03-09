import { Router } from "express";
import * as controller from '../controllers/controllers.js';
const router = Router();
import { localVariables } from "../middlewares/verify_token.js";

router.route('/register').post(controller.register);
router.route('/registerMail').post(controller.registerMail);
router.route('/authenticate').post(controller.authenticate);
router.route('/login').post(controller.verifyUser, controller.login);

router.route('/user/:username').get(controller.getUsername);
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

router.route('/updateUser').put(controller.updateUser);
router.route('/resetPassword').put(controller.resetPassword);

export default router;