import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models';

@Component({
  selector: 'app-navbarmodal',
  templateUrl: './navbarmodal.component.html',
  styleUrls: ['./navbarmodal.component.scss']
})
export class NavbarmodalComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService, public dialogRef: MatDialogRef<NavbarmodalComponent>, private router: Router) { }

  ngOnInit(): void {
    this.setDialogPosition();
    this.userService.loggedInCheck().then(user => {
      this.setUser(user);
      return user;
    })
  }

  setUser(user: any): void {
    this.user = user;
  }

  setDialogPosition() {
    this.dialogRef.updatePosition({top: '6rem'});
  }

  closeDialog() {
    this.dialogRef.close('reee');
  }

  navTo(selection: string) {
    switch (selection) {
      case 'home':
        this.router.navigateByUrl('')
        this.closeDialog();
        break;
      case 'sounds':
        console.log('sounds chosen BIHHH');
        this.router.navigateByUrl('soundlist');
        this.closeDialog();
        break;
      case 'project-hosting':
        // this.router.navigateByUrl('project-hosting')
        console.log('REEEE FIX MEEEE REEEEE');
        this.closeDialog();
        break;
      case 'about':
        this.router.navigateByUrl('about');
        this.closeDialog();
        break;
      case 'account':
        this.router.navigateByUrl('account');
        this.closeDialog();
        break;
      case 'login':
        this.router.navigateByUrl('login');
        this.closeDialog();
        break;
      case 'contact':
        this.router.navigateByUrl('contact');
        this.closeDialog();
        break;
      default:
        break;
    }
  }

}
