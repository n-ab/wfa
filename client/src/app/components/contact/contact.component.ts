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
      message: new FormControl(null, Validators.required),
      desiredTurnaround: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.userCheck();
    window.scrollTo(0, 0);
  }

  email() {
    console.log('this.desiredTurnaround = ', this.emailForm.controls['desiredTurnaround'].value)
    console.log('this.email reee = ', this.emailForm.controls['email'].value)
    console.log('this.emailForm.getRawValue() = ', this.emailForm.getRawValue());
    this.contactService.email(this.emailForm.getRawValue()).then(message => {
      console.log('server response: ', message);
      return message;
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

  selection(selection: string): void {
    switch (selection) {
      case 'email':
        this.emailSelected = true;
        this.phoneSelected = false;
        this.faxSelected = false;
        console.log('this.emailSelected = ', this.emailSelected);
        document.getElementById('REE')?.scrollIntoView({behavior: 'smooth'});
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

}
