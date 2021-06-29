import { MessageModel } from "../models/message";
import { UserModel } from '../models/user';
import { CartModel } from '../models/cart';
import { WorkorderModel } from '../models/workOrder';

export function fetchMessages() {
    return MessageModel.find({})
        .then(messages => messages)
        .catch(err => err);
}