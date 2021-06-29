import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Message, Workorder } from 'src/app/models';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { WorkorderService } from 'src/app/services/workorder.service';
import { WorkorderModel } from '../../../../../server/src/models/workOrder';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user!: User;
  messages: Message[] = [];
  workOrders: Workorder[] = [];

  messagesSelected = false;
  workOrdersSelected = false;

  constructor(private userService: UserService, private router: Router, private messageService: MessageService, private workorderService: WorkorderService) { }

  ngOnInit(): void {
    this.userCheck();
  }

  userCheck(): Promise<any> {
    return this.userService.loggedInCheck()
      .then(user => {
        console.log('admin user: ', user);
        if (user) {
          this.setUser(user);
        }
      });
  }

  setUser(user: any): void {
    if (user.admin > 0) {
      if (user.normalUser = 0) {
        if (user.specialUser = 0) {
          console.log('woooo!');
        }
      }
    } else {
      this.router.navigateByUrl('');
    }
    this.user = user;
  }

  selection(selection: string) {
    switch (selection) {
      case 'messages': 
        this.messagesSelected = true;
        this.workOrdersSelected = false;
        this.getMessages();
        break;
      case 'workOrders':
        this.workOrdersSelected = true;
        this.messagesSelected = false;
        this.getWorkorders();
        break;
    }
  }

  getMessages(): void {
    this.messageService.fetchMessages().then(messages => {
      console.log('messages fetched = ', messages)
    })
  }

  setMessages(messages: any): void {
    this.messages = messages;
  }

  getWorkorders(): void {
    this.workorderService.fetchWorkorders()
    .then(workOrders => {
      this.setWorkorders(workOrders);
    })
  }

  setWorkorders(workOrders: any): void {
    this.workOrders = workOrders;
  }



}
