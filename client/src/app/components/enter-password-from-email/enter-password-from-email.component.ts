import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models';

@Component({
  selector: 'app-enter-password-from-email',
  templateUrl: './enter-password-from-email.component.html',
  styleUrls: ['./enter-password-from-email.component.scss']
})
export class EnterPasswordFromEmailComponent implements OnInit {

  passwordForm: FormGroup;
  routeParams: any;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.passwordForm = new FormGroup({
      password: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.routeParams = this.route.snapshot.params;
  }

  updatePassword(): void {
    this.userService.updatePassword(this.passwordForm.getRawValue(), this.routeParams);
  }

}
