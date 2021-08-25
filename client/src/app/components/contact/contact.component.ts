import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  user!: User;

  emailForm: FormGroup;

  emailSelected = true;
  phoneSelected = false;
  faxSelected = false;

  constructor(private userService: UserService, private contactService: ContactService, private router: Router) {
    this.emailForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      projectName: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
      desiredTurnaround: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.userCheck();
    window.scrollTo(0, 0);
  }

  email() {
    this.contactService.email(this.emailForm.getRawValue()).then(email => {
      this.router.navigate(['/message-received'], {queryParams: email});
      return email;
    });
  }

  userCheck(): Promise<any> {
    return this.userService.loggedInCheck()
      .then(user => {
        if (user) {
          this.setUser(user);
        }
      });
  }

  setUser(user: any): void {
    this.user = user;
  }

}
