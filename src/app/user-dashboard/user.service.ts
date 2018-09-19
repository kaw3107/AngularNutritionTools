import { UserData } from './../models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { OnInit } from '@angular/core';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';


@Injectable()

export class UserService implements OnInit {
userID: string;
private basePath: String = '/user';
userDocument: AngularFirestoreDocument<UserData>;
private userDoc: AngularFirestoreDocument<UserData>;
  constructor(
    private authservice: AuthService,
    private db: AngularFirestore,
    private router: Router) {
   }

   ngOnInit() {
     this.setUser();
     console.log(this.userID);

   }

   setUser() {
     this.userID = this.authservice.getUserID();
   }

   createUserDetails(userData: UserData) {
    this.db.collection('users').doc(this.userID).set(userData);
    setTimeout(()=> {
      this.router.navigate(['/user']);
 }, 1500);
   }

}
