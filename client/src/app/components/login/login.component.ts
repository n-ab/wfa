import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  login(): void {
    return;
  }

}
