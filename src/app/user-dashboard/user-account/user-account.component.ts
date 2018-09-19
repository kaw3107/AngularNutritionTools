import { UserData } from './../../models/user.model';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  userEmail: String;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.ngOnInit();
    }


  }
