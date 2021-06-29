import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  fetchMessages(): Promise<object[]> {
    return this.http.get('/api/admin/fetchMessages').toPromise()
      .then(messages => {
        console.log('messages returned: ', messages);
        return messages;
      })
      .catch(err => err);
  }

  sendMessage(receivingClientId: string, message: string): Promise<Message> {
    return this.http.post('/api/admin/sendMessage', {params: {clientId: receivingClientId, message: message}}).toPromise()
      .then(message => message)
      .catch(err => err);
  }
}
