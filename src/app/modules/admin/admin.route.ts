import express from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middleware/Auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middleware/validateRequest';
import { AdminValidation } from './admin.validation';
const router = express.Router();

router.get('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), AdminController.getSingleAdmin);
router.get('/', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), AdminController.getAllAdmins);

router.patch('/:id', validateRequest(AdminValidation.updateAdmin), auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), AdminController.updateAdmin);

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), AdminController.deleteAdmin);

export const AdminRoutes = router;
