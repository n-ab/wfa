import { UserModel, UserObject } from '../models/user';
import * as moment from 'moment';

export function registerUser(data) {
    console.log('USER CONTROLLER - registration...', data);
    return UserModel.findOneAndUpdate(data, {$set: {newUser: data}}, { new: true, upsert: true })
    .then(user => {
        if (user.email === 'nick@waveform-arts.com') { user.privilege = 'admin';} 
        else { user.privilege = 'basic'; }
        user.save();
        console.log('user should be saved... ');
    })
    .catch(err => err);
}

export function login(data: any) {
    console.log('USER CONTROLLER - login', data);
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
        console.log(`found user ${user[0].firstName} ${user[0].lastName} with USERNAME `, username);
        if (user.length > 0) {return user;}
        else { return false; }
      })
      .catch(err => err);
}

export function emailExistsCheck(email: any): Promise<unknown> {
  return UserModel.find({email: email})
    .then(user => {
      if (user) { console.log(`found user ${user[0].firstName} ${user[0].lastName} with email `, email); }
      return user;
    })
    .catch(async err => {
      console.log('trying to match with username instead', err);
      const usernameFound = await usernameExistsCheck(email);
      if (usernameFound) {
        console.log('SUCCESS using username.');
        return usernameFound;
      }
      console.log('couldn\'t match shit dude. you are FUCKED.');
      return err;
    });
}