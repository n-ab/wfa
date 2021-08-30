import * as express from 'express';
import * as projectController from '../controllers/projectController';
import * as noteController from '../controllers/noteController';
import { NoteObject } from '../models/note';

export const app = express.Router();

app.get('/fetchProject', async (req: any, res) => {
    // console.log('req.query = ', req.query);
    const project = await projectController.fetchProject(req.query['query']);
    // console.log('returning project: ', project);
    if (project) return res.status(200).json(project);
})

app.get('/fetchNotes', async (req: any, res) => {
    return res.json('There was an error fetching notes or none were found.');
})

app.post('/addNote', async (req: any, res) => {
    const note = await noteController.createNewNote(req.body);
    console.log('note returned  = ', note);
    const project = await projectController.addNoteIdToProjectNotes(note);
    // const removingDuplicate = await noteController.deleteNoteDuplicate();
})