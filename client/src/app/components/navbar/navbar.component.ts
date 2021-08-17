import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { NavbarmodalComponent } from '../navbarmodal/navbarmodal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  showHamburger = true;

  user!: User;
  thereIsUser = false;
  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userCheck();

  }

  ngAfterViewInit(): void {
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
    const accountOptions = document.getElementById('account-options');
    console.log('accountopitons = ', accountOptions);
    if (accountOptions) {
      accountOptions!.addEventListener('mouseenter', event => {
        console.log('REEEE!!! RE RE REEE!');
        document.getElementById('account-options')?.classList.remove('hide-account-options');
      }); 
    }
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
