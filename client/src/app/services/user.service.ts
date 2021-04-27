import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Promise<any> {
    console.log('logging in user with data:', email + ' ' + password);
    if (email === null || password === null) {
      return Promise.reject('actually put shit in to log in with JACK.');
    }
    return this.http.post('/api/user/login', {email, password}).toPromise()
      .then(user => user)
      .catch(err => console.log('error logging in user: ', err));
  }

  register(data: {firstName: string, lastName: string, email: string, password: string}): Promise<any> {
    console.log('registering user with data:', data);
    if (data.email === null || data.firstName === null || data.lastName === null || data.password === null) {
      return Promise.reject('your shit is EMPTY SON.');
    } else {
      return this.http.post('/api/user/register', data).toPromise()
        .then(user => {console.log(`user ${user} was saved`); })
        .catch(err => { console.log('error registering user: ', err); });
    }
    }
}
