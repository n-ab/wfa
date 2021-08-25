import * as express from 'express';
import * as contactController from '../controllers/contactController';
import * as projectController from '../controllers/projectController';
import * as moment from 'moment';

export const app = express.Router();

app.post('/email', async (req: any, res) => {
    const project = await projectController.createNewProject(req.body['params']['data']).catch(err => console.log('error resolving new project: ', err));
    const response = await contactController.handleEmail(req.body['params']['data']).catch(err => console.log('error in contact router: ', err));
    return res.status(200).json(response['email']);
})