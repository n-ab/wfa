import * as mongoose from 'mongoose';
import { CartModel, CartObject } from '../models/cart';

export function newUserCart(userId) {
    console.log('userId: ', userId);
}

export function newGuestCart() {
    console.log('creating new guest cart...');
}