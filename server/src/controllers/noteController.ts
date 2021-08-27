import * as mongoose from 'mongoose';
import { ProjectModel } from '../models/project'
import { NoteModel } from '../models/note';
import * as moment from 'moment';

export function createInitialNote(projectId, message, senderEmail) {
    // console.log('creating new note with data: ', projectId + ' and ' + message);
    const data = {ofProject: projectId, content: message};
    return NoteModel.findOneAndUpdate(data, {$set: {newNote: data}}, {new: true, upsert: true})
        .then(note => {
            console.log('$$$ saving note as: $$$', note);
            note.postedBy = senderEmail;
            note.dateOfCreation = moment().format('LLLL');
            note.save();
            return note._id;
        }).catch(err => console.log('error saving new note: ', err));
}

export function createNewNote(data: any) {
    return NoteModel.findOneAndUpdate(data, {$set: {newNote: data}}, {new: true, upsert: true})
    .then(note => {
        console.log('√√√ saving note as: √√√', note);
        note.dateOfCreation = moment().format('LLLL');
        note.save();
        return note._id;
    })
}

export async function populateProjectNotes(projectId: string) {
    const projectNotes = await ProjectModel.findById(projectId).populate('notes').then(note => note);
    console.log('projectNotes = ', projectNotes['notes'][0]);
    return projectNotes['notes'][0];
}