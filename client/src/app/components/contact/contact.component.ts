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
      theirEmail: new FormControl(null),
      message: new FormControl(null),
      desiredTurnaround: new FormControl(null),
      
    })
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
        break;
      case 'phone':
        this.phoneSelected = true;
        this.faxSelected = false;
        this.emailSelected = false;
        break;
      case 'fax':
        this.faxSelected = true;
        this.phoneSelected = false;
        this.emailSelected = false;
        break;
      default:
        break;
    }
  }

  email() {
    this.contactService.email(this.emailForm.getRawValue()).then(message => {
      console.log('server response: ', message);
      return message;
    });
  }

  phone() {
    this.contactService.email(this.emailForm.getRawValue()).then(message => {
      console.log('server response: ', message);
      return message;
    });
  }

  fax() {
    this.contactService.email(this.emailForm.getRawValue()).then(message => {
      console.log('server response: ', message);
      return message;
    });
  }

}
