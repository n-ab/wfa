import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user!: User;

  paySelected = false;
  messageSelected = false;
  starredSelected = false;
  cartSelected = false;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  setUser(user: any): void {
    console.log('NAVBAR - SETTING USER AS ', user);
    this.user = user;
  }

  selection(selection: string): void {
    this.userService.fetchUserData()
    .then(user => {
      if (user) { return this.setUser(user); }
    });
    switch (selection) {
      case 'pay':
        this.paySelected = true;
        this.messageSelected = false;
        this.cartSelected = false;
        this.starredSelected = false;
        break;
      case 'message':
        this.paySelected = false;
        this.messageSelected = true;
        this.cartSelected = false;
        this.starredSelected = false;
        break;
      case 'starred':
        this.paySelected = false;
        this.messageSelected = false;
        this.cartSelected = false;
        this.starredSelected = true;
        break;
      case 'cart':
        this.paySelected = false;
        this.messageSelected = false;
        this.cartSelected = true;
        this.starredSelected = false;
        break;
    
      default:
        break;
    }
  }

}
