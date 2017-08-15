import {Router} from 'express';

import test from './test';
import upload from './upload';

interface IRouteSettings {
  path: string;
  router: Router;
}

const router = Router();

const routes: IRouteSettings[] = [
  {path: '/', router: test},
  {path: '/upload', router: upload},
];

routes.forEach((route: IRouteSettings) => router.use(route.path, route.router));

export default router;
