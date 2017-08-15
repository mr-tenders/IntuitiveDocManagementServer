import * as Debug from 'debug';
import * as express from 'express';
import * as Loki from 'lokijs';
import * as multer from 'multer';

const UPLOAD_PATH = 'uploads';
const DB_NAME = 'images.json';
const router = express.Router();
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, {persistenceMethod: 'fs'});
const debug = Debug('intuitive-server:upload');

const loadCollection = (collName: string, lokiDb: Loki): Promise<LokiCollection<any>> => {
  return new Promise((resolve) => {
    db.loadDatabase({}, () => {
      const coll = lokiDb.getCollection(collName) || lokiDb.addCollection(collName);
      resolve(coll);
    });
  });
};

const upload = multer({
  dest: `${UPLOAD_PATH}`,
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(tif|tiff)$/)) {
      return cb(new Error('Only TIFF files are allowed'), false);
    }
    cb(null, true);
  },
});

async function uploadFile(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const coll = await loadCollection('images', db);
    const data: any[] = [...coll.insert(req.files)];

    db.saveDatabase();
    res.send(data.map((x) => ({ id: x.$loki, fileName: x.filename, originalName: x.originalname })));
  } catch (err) {
    debug(err);
    res.sendStatus(400);
  }
}

router.post('/', upload.array('images', 25), uploadFile);

export default router;
export {router};
