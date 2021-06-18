import { Component, OnInit } from '@angular/core';
import { Cart, User, Sound, Message } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { TimeoutError } from 'rxjs';

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

  paySelected = false;
  messageSelected = false;
  starredSelected = false;
  cartSelected = false;


  constructor(private userService: UserService, private cartService: CartService) { }

  ngOnInit(): void {
  }

  setUser(user: any): void {
    console.log('NAVBAR - SETTING USER AS ', user);
    this.user = user;
  }

  selection(selection: string): void {
    // fetch data ONLY UPON REQUEST
    this.userService.fetchUserData().then(user => { if (user) { return this.setUser(user); } });
    setTimeout(() => {
      this.handleSelection(selection);
    }, 500)
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
    const response = await this.userService.fetchStarredSounds();
    console.log('STARRED response = ', response);
  }

  async getCart(): Promise<void> {
    const response = await this.userService.fetchMessages();
    console.log('CART response = ', response);
  }

}
