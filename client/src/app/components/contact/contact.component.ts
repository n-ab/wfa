import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      email: new FormControl(null),
      name: new FormControl(null),
      message: new FormControl(null),
      desiredTurnaround: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.userCheck();
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

  selection(selection: string): void {
    switch (selection) {
      case 'email':
        this.emailSelected = true;
        this.phoneSelected = false;
        this.faxSelected = false;
        console.log('this.emailSelected = ', this.emailSelected);
        document.getElementById('email')?.scrollIntoView({behavior: 'smooth'});
        break;
      case 'phone':
        this.phoneSelected = true;
        this.faxSelected = false;
        this.emailSelected = false;
        console.log('this.phoneSelected = ', this.phoneSelected);
        break;
      case 'fax':
        this.faxSelected = true;
        this.phoneSelected = false;
        this.emailSelected = false;
        console.log('this.faxSelected = ', this.faxSelected);
        break;
      default:
        break;
    }
  }

  email() {
    console.log('this.emailForm.getRawValue() = ', this.emailForm.getRawValue());
    this.contactService.email(this.emailForm.getRawValue()).then(message => {
      console.log('server response: ', message);
      return message;
    });
  }

}
