import { Router } from 'express';

import test from './test';

interface IRouteSettings {
  path: string,
  router: Router
}

const router = Router();

const routes: IRouteSettings[] = [
  { path: '/', router: test }
];

routes.forEach(route => router.use(route.path, route.router));

export default router;
