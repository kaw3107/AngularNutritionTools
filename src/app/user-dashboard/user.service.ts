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
usersCollection: AngularFirestoreCollection<UserData>;
user: Observable<UserData>;
userDoc: AngularFirestoreDocument<UserData>;
private basePath: String = '/user';


  constructor(
    private authservice: AuthService,
    private db: AngularFirestore,
    private router: Router) {
   }

   ngOnInit() {
    this.setUser();
    this.fetchAvailableUsers();
    this.afs.collection("users")
    .doc(this.id)
    .ref
    .get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    //  this.fetchAvailableUsers();

   }

   setUser() {
     this.userID = this.authservice.getUserID();
   }

   fetchUser(userData: UserData) {
     console.log(userData.displayName);
  }

  // user() {
  //   this.userDoc = this.db.collection('user').doc(this.userID);
  //   const displayName
  //   this.getUser({
  //     displayName: this.userDoc.data().displayName,
  //   });
  // }
  // }

   createUserDetails(userData: UserData) {
    this.db.collection('users').doc(this.userID).set(userData);
    setTimeout(()=> {
      this.router.navigate(['/user']);
 }, 1500);
   }

   fetchAvailableUsers() {
   }


  //  fetchUserDetails () {
  //    this.fbSubs.push(this.db
  //     .collection('users')
  //     .doc(this.userID)
  //     .valueChanges()
  //     .subscribe((userData: UserData) => {
  //       this.userDetailsChanged.next(userData);
  //     }));
  //  }

}
