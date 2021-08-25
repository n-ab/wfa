import * as mongoose from 'mongoose';
import { MessageModel } from '../models/message';
import * as projectController from '../controllers/projectController';

export function handleEmail(data: any) {
    delete data.projectName;
    data.name = data.firstMessageFrom;
    data.email = data.contactEmail1;
    delete data.firstMessageFrom;
    delete data.contactEmail1;
    return MessageModel.findOneAndUpdate(data, {$set: {newMessage: data}}, { new: true, upsert: true })
        .then(message => {
            message.save();
            return message;
        }).catch(err => console.log('error handling email: ', err));
}