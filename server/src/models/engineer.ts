import * as mongoose from 'mongoose';

export interface EngineerObject extends mongoose.Document {
    _id: any, 
    name: string,
    status: string,
    level: string, // 1: engineer, 2: intern, 3: guest
    email: string,
    phone: string,
    password: string,
    username: string,
    projects: string[],
    clients: string[],
    notes: string[],
    discussions: string[]
}

const schema = new mongoose.Schema({
    name: String,
    status: String,
    level: String,
    email: String,
    phone: String,
    password: String,
    username: String,
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note'}],
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion'}],
}, {timestamps: true});

export const EngineerModel = mongoose.model<EngineerObject>('Engineer', schema);