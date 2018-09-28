import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { UserData } from './../../models/user.model';
import { UserService } from './../user.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  users: UserData[];
  editDisplayNameState: boolean = false;
  editEmailState: boolean = false;
  editPasswordState: boolean = false;
  userToEdit: UserData;
  userID: string = '';

  accFormGroup: FormGroup;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.userService.ngOnInit();
    this.userService.getUserData().subscribe(users => {
      this.users = users;
    });
    this.userID = this.userService.userID;
  }

  editItem(userData: UserData) {
    this.userToEdit = userData;
  }
  editDisplayNameMode() {
    this.editDisplayNameState = true;
  }
  editEmailMode() {
    this.editEmailState = true;
  }
  editpasswordMode() {
    this.editPasswordState = true;
  }

  updateUserData(userData: UserData) {
    this.userService.updateUser(userData);
    this.editDisplayNameState = false;
    this.editEmailState = false;
    this.editPasswordState = false;
  }
}

