import * as mongoose from 'mongoose';

export interface WorkorderObject extends mongoose.Document {
    _id: any, 
    title: string,
    status: string, // received | in progress | complete
    estimatedFinish: string,
    correspondingUser: string,
    correspondingMessage: string,
    description: string,
    price: number
}

const schema = new mongoose.Schema({
    title: String,
    status: String,
    estimatedFinish: String,
    correspondingUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    correspondingMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message'},
    description: String,
    price: Number
}, { timestamps: true });

export const WorkorderModel = mongoose.model<WorkorderObject>('Workorder', schema);