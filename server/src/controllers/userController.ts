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
  console.log('userController - usernameExistsCheck = ', username);
    return UserModel.find({"username": username})
      .then(user => user)
      .catch(err => err);
}

export function emailExistsCheck(email: string): Promise<unknown> {
  console.log('userController - emailExistsCheck = ', email);
  return UserModel.find({"email": email})
    .then(user => user)
    .catch(err => err);
}