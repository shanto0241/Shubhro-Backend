import express from 'express';
import { StoriesController } from './stories.controller';
import { StoriesValidation } from './stories.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/Auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// for global User
router.get('/:id', StoriesController.getSingleStory);
router.get('/', StoriesController.getAllStories);

// for admins and protected
router.patch('/update/:id', validateRequest(StoriesValidation.newStorySchema), auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), StoriesController.updateStory);

router.delete('/delete/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), StoriesController.deleteStory);

router.post('/create', validateRequest(StoriesValidation.newStorySchema), StoriesController.createStory);

export const StoriesRoutes = router;
