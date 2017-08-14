import * as ex from 'express';

const router = ex.Router();

function login(req: ex.Request, res: ex.Response, next: ex.NextFunction) {
  return res.json({
    status: 101,
    statusText: "OK"
  });
}

router.get('/', login);
router.post('/', login);

export default router;
