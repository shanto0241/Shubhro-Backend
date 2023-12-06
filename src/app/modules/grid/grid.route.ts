import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/Auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { GridController } from './grid.controller';

const router = express.Router();

// for global User
router.get('/:id', GridController.getSingle);
router.get('/', GridController.getAll);

// for admins and protected

router.delete('/delete/:id', GridController.deletePhoto);
router.post('/create', GridController.createPhoto);

export const GridRoutes = router;
