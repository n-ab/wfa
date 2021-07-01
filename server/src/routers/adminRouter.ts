import * as express from 'express';
import * as adminController from '../controllers/adminController';
import { WorkorderModel } from '../models/workOrder';

export const app = express.Router();

app.get('/fetchMessages', async (req: any, res) => {
    const messages = await adminController.fetchMessages();
    console.log('returning messages: ', messages);
    return res.status(200).json(messages);
})

app.get('/fetchWorkOrders', async (req: any, res) => {
    const workOrders = await adminController.fetchWorkorders();
    return res.status(200).json(workOrders);
})