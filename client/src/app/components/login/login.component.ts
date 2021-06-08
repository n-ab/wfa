import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user!: User;

  constructor(private router: Router, private userService: UserService, private navbar: NavbarComponent) {
    this.loginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

  async login(): Promise<any> {
    console.log('attempting to login...');
    // tslint:disable-next-line:no-string-literal
    const email = await this.userService.emailExistsCheck(this.loginForm.controls['username'].value);
    if (email) { 
      console.log('email found:', email);
      const user = await this.userService.login(this.loginForm.getRawValue())
        .then(user => {
          console.log('LOGGED IN: ', user);
          this.navbar.setUser(user);
        })
    }
    else { return Promise.reject('no user found.')}
  }
}
