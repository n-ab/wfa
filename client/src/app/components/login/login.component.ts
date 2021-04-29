import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

  async login(): Promise<User> {
    console.log('attempting to login...');
    // tslint:disable-next-line:no-string-literal
    const email = await this.userService.emailExistsCheck(this.loginForm.controls['email'].value);
    if (email) { console.log('email found:', email); return this.userService.login(this.loginForm.getRawValue()); }
    else {
      // tslint:disable-next-line:no-string-literal
      const username = await this.userService.usernameExistsCheck(this.loginForm.controls['email'].value);
      if (username) { console.log('username found: ', username); return this.userService.login(this.loginForm.getRawValue()); }
      else          { return Promise.reject('No user found with that email or username...'); }
    }
  }

}
