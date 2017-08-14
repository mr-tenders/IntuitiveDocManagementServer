import * as express from 'express';
import * as Debug from 'debug';
import * as helmet from 'helmet';

import routes from './routes';

const debug = Debug('intuitive-server:a');

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Set up middleware
app.use(helmet());
app.use('/test', routes);

app.get('/foo', (req, res) => {
  debug(`${req.method}: ${req.path}`);
  return res.status(200).type('text').send('foo');
});

app.use('/', (req, res) => {
  return res.status(200).type('xml').send('<Foo id="1">ABC</Foo>');
});

app.listen(PORT, () => {
  debug(`Application server listening on port ${PORT}`);
});
