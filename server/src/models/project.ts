import * as mongoose from 'mongoose';

export interface ProjectObject extends mongoose.Document {
    _id: any,
    projectNumber: number,
    projectName: string,
    subtitle: string,
    discussions: string[],
    message: string             // initial message
    notes: string[],
    wfaEngineers: string[],
    clientIds: string[],
    desiredTurnaround: string,
    firstMessageFrom: string,
    contactEmail1: string,
    contactEmail2: string,
    ipAddress: string,
    files: string[]             // file paths
}

const schema = new mongoose.Schema({
    projectNumber: Number,
    projectName: String,
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
    ipAddress: String,
    files: [String],
}, { timestamps: true });

export const ProjectModel = mongoose.model<ProjectObject>('Project', schema);