import * as express from 'express';

const router = express.Router();

function test(req: express.Request, res: express.Response, next: express.NextFunction) {
  return res.json({
    status: 101,
    statusText: 'OK',
  });
}

router.get('/', test);
router.post('/', test);

export default router;
export { router };
