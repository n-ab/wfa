import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  email(data: any) {
    console.log('contact service: ', data);
    return this.http.post('/api/contact/email', {params: {data}}).toPromise()
      .then(email => {
        console.log('email of submitter = ', email);
        return email;
      })
      .catch(err => err);
  }
}
