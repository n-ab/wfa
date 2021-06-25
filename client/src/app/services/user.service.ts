import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(data: any): Promise<any> {
    return this.http.post('/api/user/login', data).toPromise()
      .then(user => {
        console.log('LOGIN SUCCESS');
        return user;
      })
      .catch(err => console.log('error logging in user: ', err));
  }

  register(data: {firstName: string, lastName: string, email: string, password: string}): Promise<any> {
    console.log('registering user with data:', data);
    if (data.email === null || data.firstName === null || data.lastName === null || data.password === null) {
      return Promise.reject('CORRUPT DATA WHEN REGISTERING. aborting...');
    } else {
      return this.http.post('/api/user/register', data).toPromise()
        .then(user => {console.log(`REGISTER SUCCESS: ${user}`); })
        .catch(err => { console.log('error registering user: ', err); });
    }
  }

  emailExistsCheck(email: string): Promise<boolean> {
    const params  = new HttpParams().set('email', email).set('validator', 'validated-012');
    return this.http.get('/api/user/emailExistsCheck', {params}).toPromise()
      .then(emailFound => {
        console.log('SUCCESS VERIFYING EMAIL EXISTS', emailFound);
        return this.http.post('/api/user/login', emailFound);
      })
      .catch(err => err);
  }

  usernameExistsCheck(username: string): Promise<boolean> {
    return this.http.get('/api/user/usernameExistsCheck', {params: {username}}).toPromise()
      .then(usernameFound => usernameFound)
      .catch(err => err);
  }

  loggedInCheck(): Promise<object> {
    return this.http.get('/api/user/check').toPromise()
      .then(user => user)
      .catch(err => err);
  }

  starSound(id: string): Promise<any> {
    return this.http.post('/api/user/starSound', {params: {id}}).toPromise()
      .then(starred => starred)
      .catch(err => err);
  }

  unstarSound(id: string): Promise<any> {
    return this.http.post('/api/user/unstarSound', {params: {id}}).toPromise()
      .then(unstarredConfirmation => unstarredConfirmation)
      .catch(err => err);
  }

  // ACCOUNT PAGE FUNCTIONS

  // -- base ---

  fetchUserData(): Promise<object> {
    return this.http.get('/api/user/getUserData').toPromise()
      .then(user => user)
      .catch(err => {
        console.log('I was unable to fetch a user because ', err);
        return err;
      })
  }

  // -- payment ---

  fetchPaymentData(): Promise<object> {
    return this.http.get('/api/user/getPaymentData').toPromise()
      .then(paymentData => {
        console.log('payment data = ', paymentData);
        return paymentData;
      })
      .catch(err => err);
  }

  // -- messages ---

  fetchMessages(): Promise<object> {
    return this.http.get('/api/user/getMessages').toPromise()
      .then(messages => {
        console.log('messages: ', messages);
        return messages;
      })
      .catch(err => err);
  }

  // -- starred ---

  fetchStarredSounds(): Promise<object> {
    console.log('attempting to fetch user\'s starred sounds...');
    return this.http.get('/api/user/getStarred').toPromise()
      .then(sounds => {
        console.log('starred sounds = ', sounds);
        return sounds;
      })
      .catch(err => err);
  }
}
