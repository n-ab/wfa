import * as express from 'express';
import * as projectController from '../controllers/projectController';

export const app = express.Router();

app.get('/fetch', (req: any, res) => {
    console.log('req.QUERY in /fetch', req.query);
    projectController.fetchProject(req.query['email'])
        .then(project => {
            console.log('project returned by controller:', project[0]);
            res.status(200).json(project[0]);
        });
})