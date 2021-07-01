import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { NavbarmodalComponent } from '../navbarmodal/navbarmodal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showHamburger = true;

  user!: User;
  thereIsUser = false;
  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userCheck();
  }

  userCheck(): Promise<any> {
    return this.userService.loggedInCheck()
      .then(user => {
        if (user) { return this.setUser(user); }
      });
  }

  setUser(user: any): void {
    if (user) { this.thereIsUser = true; }
    this.user = user;
  }

  toggleHamburger(toggle: string) {
    switch (toggle) {
      case 'hamburgerIsShowing':
        this.showHamburger = false;
        this.openNavDialog();
        break;
      case 'xIsShowing':
        this.showHamburger = true;
        break;
    }
  }

  openNavDialog(): void {
    const dialogRef = this.dialog.open(NavbarmodalComponent, {
      width: '400px',
      height: '488px'
    });
    dialogRef.afterClosed().toPromise().then(() => { this.toggleHamburger('xIsShowing') });
  }

}
