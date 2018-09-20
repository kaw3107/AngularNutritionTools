import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserData } from './../../models/user.model';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  user: UserData;
  userSubscription: Subscription;
  constructor(private userService: UserService, private db: AngularFirestore) {}

  ngOnInit() {
    this.userService.ngOnInit();
    // this.userSubscription = this.userService.userChanged.subscribe(
    //   user => (this.user = user)
    // );
    // this.userService.fetchUser();

    console.log(this.userService.displayName);
  }
  }

}
