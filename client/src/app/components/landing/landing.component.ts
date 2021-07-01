import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  user!:User;

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.userCheck();
  }

  userCheck() {
    this.userService.loggedInCheck()
      .then(user => {
        this.setUser(user);
        return user;
      })
  }

  setUser(user: any): void {
    this.user = user;
  }

  goToSoundlist(): void {
    this.router.navigateByUrl('soundlist')
  }

  signUpOrLogin(): void {
    if (this.user) {

      this.router.navigateByUrl('soundlist');
    }
    else {
      this.router.navigateByUrl('register');
    }
  }

  contact(): void {
    this.router.navigateByUrl('contact');
  }

}
