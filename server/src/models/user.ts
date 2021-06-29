import * as mongoose from 'mongoose';
import { CartModel } from './cart';

export interface UserObject extends mongoose.Document {
  _id: any,
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  username: string,
  privilege: string,
  cart: string,
  starred: string[],
  workOrders: string[],
  invoices: string[],
  messages: string[],
  admin: number,
  specialUser: number,
  normalUser: number,
  // never save ANY card data on user object
}

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  username: String,
  privilege: String,
  cart: { type: mongoose.Schema.Types.ObjectId, ref:'Cart' },
  starred: [{ type: mongoose.Schema.Types.ObjectId, ref:'Sound' }],
  workOrders: [String],
  invoices: [String],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref:'Message' }],
  admin: Number,
  specialUser: Number,
  normalUser: Number,
}, { timestamps: true });

// export interface UserDocument extends UserObject;
export const UserModel = mongoose.model<UserObject>('User', schema);