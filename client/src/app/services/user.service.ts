import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(data: any): Promise<any> {
    return this.http.post('/api/user/login', data).toPromise()
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

  emailExistsCheck(email: string): Promise<boolean> {
    const params  = new HttpParams().set('email', email).set('validator', 'validated-012');
    return this.http.get('/api/user/emailExistsCheck', {params}).toPromise()
      .then(emailFound => {
        console.log('emailFound = ', emailFound);
        return this.http.post('/api/user/login', emailFound);
      })
      .catch(err => err);
  }

  usernameExistsCheck(username: string): Promise<boolean> {
    return this.http.get('/api/user/usernameExistsCheck', {params: {username}}).toPromise()
      .then(usernameFound => usernameFound)
      .catch(err => err);
  }
}
