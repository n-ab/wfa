import * as express from 'express';
import * as contactController from '../controllers/contactController';
import * as moment from 'moment';

export const app = express.Router();

app.post('/email', (req: any, res) => {
    const response = contactController.handleEmail(req.body['params']['data']);
    return res.status(200).json(response);
})

app.post('/phone', (req: any, res) => {
    const response = contactController.handlePhone(req.body['params']['data']);
    return res.status(200).json(response);
})