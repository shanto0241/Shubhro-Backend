import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/Auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

// for global User
router.get('/:id', BlogController.getSingleBlog);
router.get('/', BlogController.getAllBlog);

// for admins and protected
router.patch('/update/:id', validateRequest(BlogValidation.newBlogSchema), BlogController.updateBlog);

router.delete('/delete/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), BlogController.deleteBlog);

router.post('/create', validateRequest(BlogValidation.newBlogSchema), BlogController.createBlog);

export const BlogRoutes = router;
