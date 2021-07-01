import { MessageModel } from "../models/message";
import { UserModel } from '../models/user';
import { CartModel } from '../models/cart';
import { WorkorderModel } from '../models/workOrder';

export function fetchMessages() {
    return MessageModel.find({})
        .then(messages => {
            console.log('messages found on server: ', messages);
            return messages;
        })
        .catch(err => err);
}

export function fetchWorkorders() {
    return WorkorderModel.find({})
        .then(workOrders => {
            console.log('messages found on server: ', workOrders);
            return workOrders;
        })
        .catch(err => err);
}