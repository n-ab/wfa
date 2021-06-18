import * as mongoose from 'mongoose'
import { UserModel } from './user';

export interface MessageObject extends mongoose.Document {
    _id: any,
    createdAt: string,
    sender: string,
    receiver: string,
    header: string,
    content: string
}

const schema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    header: String,
    content: String
}, { timestamps: true });

export const MessageModel = mongoose.model<MessageObject>('Message', schema);