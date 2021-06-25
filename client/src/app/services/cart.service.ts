import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, Sound } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addToCart(id: string) {
    console.log('reee:', id);
    return this.http.post('/api/cart/add', {params: {id}}).toPromise()
      .then(cart => cart)
      .catch(err => err);
  }

  removeFromCart(id: string) {
    return this.http.post('/api/cart/remove', {params: {id}}).toPromise()
      .then(cart => cart)
      .catch(err => err);
  }

  fetchMessages(): Promise<object> {
    return Promise.resolve({reee:'REEE'});
  }

  getUsersCart(): Promise<object>{
    return this.http.get('/api/cart/getCart').toPromise()
    .then(cart => cart)
    .catch(err => err);
  }

  populateUsersCart(): Promise<object>{
    return this.http.get('/api/cart/populateCartSounds').toPromise()
    .then(cart => cart)
    .catch(err => err);
  }

}
