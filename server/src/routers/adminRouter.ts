import * as express from 'express';
import * as adminController from '../controllers/adminController';

export const app = express.Router();

app.get('/fetchMessages', (req: any, res) => {
    const messages = adminController.fetchMessages();
    return res.status(200).json(messages);
})