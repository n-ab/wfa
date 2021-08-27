import * as express from 'express';
import * as projectController from '../controllers/projectController';
import * as noteController from '../controllers/noteController';

export const app = express.Router();

app.get('/fetchProject', async (req: any, res) => {
    console.log('req.query = ', req.query);
    const project = await projectController.fetchProject(req.query['query']);
    if (project) return res.status(200).json(project);
})

app.get('/fetchNotes', async (req: any, res) => {
    return res.json('There was an error fetching notes or none were found.');
})

app.post('/addNote', (req: any, res) => {
    const project = projectController.addNoteIdToProjectNotes(req.body).then(project => {
        console.log('project returned from projectController /addNote = ', project);
    });
    const note = noteController.createNewNote(req.body);
})