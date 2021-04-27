import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SoundService } from 'src/app/services/sound.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private userService: UserService) {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  ngOnInit(): void {
  }

  register(): void {
    this.userService.register(this.registerForm.getRawValue());
  }

}
