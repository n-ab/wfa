import { UserModel, UserObject } from '../models/user';
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
    console.log('USER CONTROLLER - login', data);
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
        console.log('REEEEE: ', user);
        if (user.length > 0) {return user;}
        else { return false; }
      })
      .catch(err => err);
}

export function emailExistsCheck(email: any): Promise<any> {
  return UserModel.find({email: email})
    .then(user => {
      if (user) { console.log(`userController - emailExistsCheck() -- found user`, user); }
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