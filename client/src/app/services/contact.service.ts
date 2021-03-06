import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  email(data: any) {
    return this.http.post('/api/contact/email', {params: {data}}).toPromise()
      .then(message => message)
      .catch(err => err);
  }

  phone(data: any) {
    return this.http.post('/api/contact/phone', {params: {data}}).toPromise()
      .then(message => message)
      .catch(err => err);
  }
}
