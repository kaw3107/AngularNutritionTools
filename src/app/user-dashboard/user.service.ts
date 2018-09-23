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
private userRef: AngularFirestoreCollection<UserData>;
userChanged = new Subject<UserData>();
docId: Observable<UserData[]>;
private userData: UserData[] = [];
// users: Observable<any>;
displayName: string;


  constructor(
    private authservice: AuthService,
    private db: AngularFirestore,
    private router: Router) {
   }

   ngOnInit() {
    this.setUser();
   }

   setUser() {
     this.userID = this.authservice.userID;
     this.email = this.authservice.userEmail;
   }

  //  fetchUser(){
//     this.userRef = this.db.collection('users', ref => ref.where('id', '==', this.userID));

//     this.docId = this.userRef.snapshotChanges().map( changes => {
//         return changes.map(a => {
//             const data = a.payload.doc.data() as UserData;
//             const id = a.payload.doc.id;
//             return { id, ...data };
//         });
//     });

// this.docId.subscribe(docs => {
//   docs.forEach(doc => {
//     this.displayName = doc.displayName;
//   });
// });
  //  }

   createUserDetails(userData: UserData) {
    this.db.collection('users').doc(this.userID).set(userData);
    setTimeout(()=> {
      this.router.navigate(['/user']);
 }, 1500);
   }
  }
