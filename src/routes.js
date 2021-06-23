import { Router } from 'express';
import { AuthRoutes } from './api/routes/auth';
import { UserRoutes } from './api/routes/user';

export const routes = (app) => {
    const router = Router();
    new AuthRoutes().routes(app, router);
    new UserRoutes().routes(app, router);
}