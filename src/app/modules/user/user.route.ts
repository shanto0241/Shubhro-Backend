import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/Auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post('/create-admin', validateRequest(UserValidation.createAdminZodSchema), auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), UserController.createAdmin);

export const UserRoutes = router;
