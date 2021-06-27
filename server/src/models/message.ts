import * as mongoose from 'mongoose'

export interface MessageObject extends mongoose.Document {
    _id: any,
    email: string,
    name: string,
    message: string,
    desiredTurnaround: string
}

const schema = new mongoose.Schema({
    email: String,
    name: String,
    message: String,
    desiredTurnaround: String
}, { timestamps: true });

export const MessageModel = mongoose.model<MessageObject>('Message', schema);