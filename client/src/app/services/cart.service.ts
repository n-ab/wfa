import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  async modifyCartData(command: 'star' | 'add' | 'info') {
    const user = await this.http.get('/api/user/check').toPromise()
      .then(user => user)
      .catch(err => err);
  }

}
