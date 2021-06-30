import { Component, OnInit } from '@angular/core';
import { Sound, User } from 'src/app/models';
import { CartService } from 'src/app/services/cart.service';
import { SoundService } from 'src/app/services/sound.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  user!: User;

  cartSounds!: Sound[];
  cartPrice!: number;

  constructor(private userService: UserService, private cartService: CartService, private soundService: SoundService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    return this.userService.loggedInCheck()
    .then(user => {
      this.setUser(user);
    })
    .catch(err => err);
  }

  setUser(user: any) {
    this.user = user;
    this.getCart();
  }

  async getCart(): Promise<void> {
    const response = await this.cartService.populateUsersCart().then(cart => {
      console.log('getCart() - cart = ', cart);
      if (cart) return this.setCartSounds(cart);
    });
  }

  setCartSounds(cart: any): void {
    this.cartSounds = cart.sounds;
    this.populateCartSounds(cart.sounds);
  }

  populateCartSounds(cartSounds: any): any {
    console.log('attempting to POPULATE CART SOUNDS', cartSounds);
    this.cartService.populateUsersCart();
    this.calculatePrice(cartSounds);
  }

  calculatePrice(cartSounds: any) {
    let total = 0;
    const price = this.cartSounds.map(sound => {
      total += sound.price;
    });
    this.cartPrice = total;
  }


}
