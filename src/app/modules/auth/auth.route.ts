import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middleware/validateRequest';
import { AuthController } from './auth.controller';
import auth from '../../middleware/Auth';
const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginZodSchema), AuthController.loginUser);

router.post('/refresh-token', validateRequest(AuthValidation.refreshTokenZodSchema), AuthController.refreshToken);

// router.post(
//     '/change-password',
//     validateRequest(AuthValidation.changePasswordZodSchema),
//     auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//     AuthController.changePassword
//.....);
// router.post('/forgot-password', AuthController.forgotPass);

// router.post('/reset-password', AuthController.resetPassword);

export const AuthRoutes = router;
