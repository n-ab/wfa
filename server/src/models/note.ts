import * as mongoose from 'mongoose';

export interface NoteObject extends mongoose.Document {
    _id: any,
    header: string,
    subject: string,
    from: string,
    to: string,
    ofDiscussion: string
}

const schema = new mongoose.Schema({
    header: String,
    subject: String,
    from: String,
    to: String,
    ofDiscussion: String
}, { timestamps: true });

export const NoteModel = mongoose.model<NoteObject>('Note', schema);