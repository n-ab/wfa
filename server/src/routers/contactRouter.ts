import * as express from 'express';
import * as contactController from '../controllers/contactController';
import * as projectController from '../controllers/projectController';
import * as moment from 'moment';

export const app = express.Router();

app.post('/email', async (req: any, res) => {
    const response = await contactController.handleEmail(req.body['params']['data']);
    const project = await projectController.createNewProject(req.body['params']['data']);
    console.log('response', response);
    console.log('project', project);
    return res.status(200).json({response, project});
})