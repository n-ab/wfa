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

  dialogUpload(): void {
    const summaries = document.getElementById('summaries');
    const summaryHeaders = document.getElementById('summary');
    const buttonContainers = document.querySelectorAll('[type=button]');
    const everything = document.querySelectorAll('#summaries > div');
    const here = document.getElementById('here');
    summaryHeaders?.classList.remove('summary');
    here?.classList.remove('here-link');
    here?.classList.add('hide');
    buttonContainers.forEach(buttonContainer => {
      console.log('reeeeeee:', buttonContainer.classList);
      buttonContainer.classList.add('hide');
      buttonContainer.classList.remove('button-container');
      console.log('reeeeeee:', buttonContainer.classList);
    })
    everything.forEach(x => {
      // console.log('x = ', x);
      x.classList.remove('summary');
      x.classList.add('color-black');
      console.log('x.classList = ', x.classList);
    })
    summaries?.classList.add('fade-to-black');
    summaries?.classList.remove('summaries');
    console.log('summaries classlist: ', summaries?.classList);
    // this.router.navigateByUrl('dialog-file-upload');
    setTimeout(() => {
      this.router.navigateByUrl('upload-dialog-file');
    }, 500);
  }

  goToHostingDescription(): void {
    this.router.navigateByUrl('');
  }

}
