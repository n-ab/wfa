import * as express from 'express';
import * as projectController from '../controllers/projectController';
import * as noteController from '../controllers/noteController';

export const app = express.Router();

app.get('/fetchProject', async (req: any, res) => {
    const project = await projectController.fetchProject(req.query['email']);
    if (project) return res.status(200).json(project);
})

app.get('/fetchNotes', async (req: any, res) => {
    return res.json('There was an error fetching notes or none were found.');
})

app.post('/addNote', (req: any, res) => {
    console.log('req.body: ', req.body);
})