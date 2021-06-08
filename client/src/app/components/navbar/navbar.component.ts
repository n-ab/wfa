import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: User;
  thereIsUser = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userCheck();
  }

  userCheck(): Promise<any> {
    console.log('CHECKING FOR LOGGED IN USER');
    return this.userService.loggedInCheck()
      .then(user => {
        if (user) { return this.setUser(user); }
      })
  }

  setUser(user: any): void {
    console.log('NAVBAR - SETTING USER AS ', user);
    if (user) {this.thereIsUser = true}
    this.user = user;
    // this.user = user[0];
  }

}
