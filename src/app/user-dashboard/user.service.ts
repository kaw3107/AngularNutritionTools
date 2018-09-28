import { UserData } from './../models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { OnInit } from '@angular/core';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()

export class UserService implements OnInit {
userID: string;
email: string;
usersCollection: AngularFirestoreCollection<UserData>;
users: Observable<UserData[]>;
userDoc: AngularFirestoreDocument<UserData>;

  constructor(
    private authservice: AuthService,
    private db: AngularFirestore,
    private router: Router) {
   }

   ngOnInit() {
    this.setUser();
    this.usersCollection = this.db.collection('users');

    this.users = this.usersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as UserData;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

   getUserData() {
     return this.users;
   }

   setUser() {
     this.userID = this.authservice.userID;
     this.email = this.authservice.userEmail;
   }

   createUserDetails(userData: UserData) {
    this.db.collection('users').doc(this.userID).set(userData);
    setTimeout(()=> {
      this.router.navigate(['/user']);
 }, 1000);
   }

   updateUser(userData: UserData) {
     this.userDoc = this.db.doc('users/' + this.authservice.userID);
     this.userDoc.update(userData);

   }
  }
