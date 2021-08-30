import * as mongoose from 'mongoose';
import { ProjectModel } from '../models/project';
import { NoteModel } from '../models/note';
import * as noteController from '../controllers/noteController';

export async function createNewProject(data: any) {
    data.contactEmail1 = data.email;
    data.firstMessageFrom = data.name;
    delete data.name;
    delete data.email;
    console.log('$$$$ = data', data);
    return ProjectModel.findOneAndUpdate(data, {$set: {newProject: data}}, {new: true, upsert: true})
        .then(async project => {
            const note = await noteController.createInitialNote(project._id, project.message, project.contactEmail1);
            console.log('note saved = ', note);
            project.notes.push(note);
            project.save();
            return project;
        })
        .catch(err => console.log('error with creating project model: ', err));
}

export async function fetchProject(email: string) {
    console.log('email = ', email);
    const project = await ProjectModel.findOne({contactEmail1: email});
    if(project){
        const projectWithNotes = await project.populate('notes').execPopulate();
        console.log('projectWithNotes;', projectWithNotes);
        // const sortedNotes = [... new Set(projectWithNotes.notes)];
        // console.log('sortedNotes: ', sortedNotes);
        return projectWithNotes;
    } else {
        return '--- reee --- ';
    }
}

export async function addNoteIdToProjectNotes(data: any) {
    console.log('adding note id: ', data['noteId']);
    console.log('to project: ', data['projectId']);
    const arrayOfNoteIds = [];
    ProjectModel.findById(data['projectId'])
        .then(project => {
            // console.log('project notes PRE push= ', project.notes);
            arrayOfNoteIds.push(project.notes['id']);
            project.notes.push(data['noteId']);
            // console.log('project notes POST push= ', project.notes);
            console.log('arrayOfNoteIds = ', arrayOfNoteIds);
            project.save();
            return project.notes;
        })
}

// export function deleteNoteDuplicate()