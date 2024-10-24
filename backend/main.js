import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import PhoneRouter from './routes/phone.js';

const app = express();

app.use(bodyParser.json());
app.use('/', PhoneRouter);
app.use(cors());

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen('8001', (err) => {
  if (err) {
    console.log(err);
  }
});
