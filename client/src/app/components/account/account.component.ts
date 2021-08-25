import { Component, OnInit } from '@angular/core';
import { Cart, User, Sound, Message } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

// account properties
  user!: User;
  userMessages!: Message[];
  userCart!: Cart;
  userStarred!: Sound[]
  starredSounds!: Sound[];
  cartSounds!: Sound[];

  paySelected = false;
  messageSelected = false;
  starredSelected = false;
  cartSelected = false;

  cartPrice!: number;

  constructor(private userService: UserService, private cartService: CartService, private soundService: SoundService, private router: Router) { }

  ngOnInit(): void {
    this.userService.loggedInCheck().then(user => {
      if (!user) {
        this.router.navigateByUrl('login');
      }
    })
  }

  setUser(user: any): void {
    this.user = user;
  }

  selection(selection: string): void {
    // fetch data ONLY UPON REQUEST
    this.userService.fetchUserData().then(user => { if (user) { return this.setUser(user); } });
    this.handleSelection(selection);
  }

  handleSelection(selection: string) {
    switch (selection) {
      case 'pay':
        this.paySelected = true;
        this.messageSelected = false;
        this.cartSelected = false;
        this.starredSelected = false;
        this.getPaymentData();
        break;
      case 'message':
        this.paySelected = false;
        this.messageSelected = true;
        this.cartSelected = false;
        this.starredSelected = false;
        this.getMessages();
        break;
      case 'starred':
        this.paySelected = false;
        this.messageSelected = false;
        this.cartSelected = false;
        this.starredSelected = true;
        this.getStarred();
        break;
      case 'cart':
        this.paySelected = false;
        this.messageSelected = false;
        this.cartSelected = true;
        this.starredSelected = false;
        this.getCart();
        break;
    
      default:
        break;
    }
    
  }

  async getPaymentData(): Promise<void> {
    const response = await this.userService.fetchPaymentData();
    console.log('PAY response = ', response);
  }

  async getMessages(): Promise<void> {
    const response = await this.userService.fetchMessages();
    console.log('MESSAGE response = ', response);
  }

  async getStarred(): Promise<void> {
    console.log('attempting to fetch sounds... REEE');
    const response = await this.userService.fetchStarredSounds().then(sounds => {
      if (sounds) return this.setStarredSounds(sounds);
    })
  }

  setStarredSounds(sounds: any): void {
    this.starredSounds = sounds;
  }

  // --- 1 ---------------
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

  goToCheckout(): void {
    this.router.navigateByUrl('checkout');
  }

}
