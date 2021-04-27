import * as mongoose from 'mongoose';

export interface CartObject extends mongoose.Document {
    _id: any,
    userId: string,
    sounds: string[],
}

const schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sounds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sound' }]
})

export const CartModel = mongoose.model<CartObject>('Cart', schema);