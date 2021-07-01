import * as mongoose from 'mongoose';

export interface DiscussionObject extends mongoose.Document {
    _id: any,
    wfaEngineer: string,
    clientId: string,
    notes: string[],
    relatedProject: string,
}

const schema = new mongoose.Schema({
    wfaEngineer: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref:'Note' }],
    relatedProject: String,
    turnaroundGoal: String
}, { timestamps: true });

export const DiscussionModel = mongoose.model<DiscussionObject>('Discussion', schema);