import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private cartService: CartService, private soundService: SoundService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=AUy12EbsDQtINmXYlmziHt95EI0821bXA7cKVgWInk5f_5h6xrCqVrIb9XPcFQ-gMezcuaqUsjz37TX2';
    var script = document.createElement('script');
    script.setAttribute('src', PAYPAL_SCRIPT);
    document.head.appendChild(script);
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

  goToCart(): void {
    this.router.navigateByUrl('account');
  }

}
