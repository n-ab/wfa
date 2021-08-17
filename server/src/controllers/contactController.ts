import * as mongoose from 'mongoose';
import { MessageModel } from '../models/message';

export function handleEmail(data: any) {
    console.log('handling data with EMAIL: ', data);
    return MessageModel.findOneAndUpdate(data, {$set: {newMessage: data}}, { new: true, upsert: true })
        .then(message => {
            console.log('EMAIL REQUEST - attempting to save message = ', message);
        }).catch(err => err);
}

export function handlePhone(data: any) {
    console.log('handling data with PHONE: ', data);
    return MessageModel.findOneAndUpdate(data, {$set: {newMessage: data}}, {new: true, upsert: true})
        .then(message => {
            console.log('PHONE REQUEST - attempting to save message = ', message);
        }).catch(err => err);
}  