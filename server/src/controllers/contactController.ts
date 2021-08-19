import * as mongoose from 'mongoose';
import { MessageModel } from '../models/message';
import * as projectController from '../controllers/projectController';

export function handleEmail(data: any) {
    return MessageModel.findOneAndUpdate(data, {$set: {newMessage: data}}, { new: true, upsert: true })
        .then(message => {
            console.log('EMAIL REQUEST - attempting to save message = ', message);
            message.save();
            return message;
        }).catch(err => err);
}