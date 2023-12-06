import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { StoriesRoutes } from '../modules/stories/stories.route';
import { GridRoutes } from '../modules/grid/grid.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/admins',
        route: AdminRoutes
    },
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/stories',
        route: StoriesRoutes
    },
    {
        path: '/blog',
        route: BlogRoutes
    },
    {
        path: '/grid',
        route: GridRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
