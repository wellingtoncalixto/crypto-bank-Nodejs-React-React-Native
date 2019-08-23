import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/login', SessionController.store);
routes.post('/create', UserController.store);

export default routes;
