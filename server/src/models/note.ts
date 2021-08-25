import * as mongoose from 'mongoose';

export interface NoteObject extends mongoose.Document {
    _id: any,
    header: string,
    content: string,
    postedBy: string,
    to: string, // either user id, engineer id, or all
    ofDiscussion: string,
    ofProject: string,
    dateOfCreation: string,
    starred: boolean
}

const schema = new mongoose.Schema({
    header: String,
    content: String,
    postedBy: String,
    to: String,
    ofDiscussion: String,
    ofProject: String,
    dateOfCreation: String,
    starred: Boolean,
}, { timestamps: true });

export const NoteModel = mongoose.model<NoteObject>('Note', schema);