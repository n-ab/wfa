import { UserModel } from '../models/user';
import { CartModel } from '../models/cart';
import { MessageModel } from '../models/message';
import * as soundController from '../controllers/soundController';
import * as moment from 'moment';
import * as auth from '../auth/auth';

export function registerUser(data) {
    console.log('USER CONTROLLER - registration...', data);
    return UserModel.findOneAndUpdate(data, {$set: {newUser: data}}, { new: true, upsert: true })
    .then(user => {
        if (user.email === 'nick@waveform-arts.com') { user.privilege = 'admin';} 
        else { user.privilege = 'basic'; }
        user.save();
        console.log('user should be saved... ');
        return user;
    })
    .catch(err => err);
}

export function login(data: any) {
    // auth.login(data);
    return UserModel.find({"email" : data.email});
}

export function getAllUsers() {
    return UserModel.find({})
        .then(user => user)
        .catch(err => err);
}

export function usernameExistsCheck(username: string) {
    return UserModel.find({username: username})
      .then(user => {
        if (user.length > 0) {return user;}
        else { return false; }
      })
      .catch(err => err);
}

export function emailExistsCheck(email: any): Promise<any> {
  return UserModel.find({email: email})
    .then(user => {
      return user;
    })
    .catch(async err => {
      console.log('trying to match with username instead', err);
      const usernameFound = await usernameExistsCheck(email);
      if (usernameFound) {
        console.log('SUCCESS using username.', usernameFound);
        return usernameFound;
      }
      console.log('couldn\'t match shit dude. you are FUCKED.');
      return err;
    });
}

export function starSound(soundId: any, userId) {
  console.log('soundId = ', soundId['id']);
  console.log('userId = ', userId);
  UserModel.findById(userId)
    .then(user => {
      console.log('user starred list BEFORE: ', user.starred);
      // user.starred += soundId['id'];
      user.starred.push(soundId['id']);
      console.log('user starred list AFTER: ', user.starred);
      user.save();
    })
}

export function getUserData(userId: string): Promise<object> {
  return UserModel.findById(userId, {'password': 0})
    .then(user => user)
    .catch(err => err);
}

export function getPaymentData(userId: string): Promise<object> {
  return;
}

export function getMessages(userId: string): Promise<object> {
  return;
}

export function getStarred(userId: string): Promise<object> {
  return UserModel.findById(userId)
  .then(async user => {
    user.starred;
    const der = await soundController.fetchTheseSounds(user.starred);
    console.log('der = ', der);
    return der;
  })
  .catch(err => err);
}