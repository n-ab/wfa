import * as mongoose from 'mongoose';

export interface ProjectObject extends mongoose.Document {
    _id: any,
    projectNumber: string,
    title: string,
    subtitle: string,
    discussions: string[],
    notes: string[],
    wfaEngineers: string[],
    clientIds: string[],
    turnaroundGoal: string,
    message: string             // initial message
    firstMessageFrom: string,
    contactEmail1: string,
    contactEmail2: string,
}

const schema = new mongoose.Schema({
    projectNumber: String,
    title: String,
    subtitle: String,
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion'}],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note'}],
    wfaEngineers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    clientIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    desiredTurnaround: String,
    message: String,             // initial message 
    firstMessageFrom: String,
    contactEmail1: String,
    contactEmail2: String,
}, { timestamps: true });

export const ProjectModel = mongoose.model<ProjectObject>('Project', schema);