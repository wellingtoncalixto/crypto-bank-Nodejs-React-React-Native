import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import Middleware from './app/middleware/auth';

const routes = new Router();

routes.post('/login', SessionController.store);
routes.post('/create', UserController.store);

routes.use(Middleware);

routes.put('/user/update', UserController.update);

export default routes;
