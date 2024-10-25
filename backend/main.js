/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { connectDb } from './mongoDb.js';
import PhoneRouter from './routes/phone.js';
import swaggerDocument from './swagger/swagger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envfile = path.join(__dirname, './.env');
dotenv.config({ path: envfile });

const app = express();

connectDb();

app.use(bodyParser.json());
app.use('/', PhoneRouter);
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen('8001', (err) => {
  if (err) {
    console.log(err);
  }
});
