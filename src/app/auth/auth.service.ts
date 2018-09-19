import { AngularFirestore } from 'angularfire2/firestore';
import { UserData} from './../models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  user = UserData;
  userID: string;
  userEmail: string;

  constructor(private router: Router, private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if ( user ) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/tools']);
      } else {
        this.authChange.next(false);
        this.router.navigate(['/']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData, ) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password).then(result => {
        console.log(result);
        this.userID = result.user.uid;
        this.userEmail = result.user.email;
        this.registerSuccessfully();
        this.db.collection('users').doc(result.user.uid).set({
          uid: result.user.uid,
          email: result.user.email,
      });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // submitUserDetails(userData: UserData) {
  //   this.db.collection('users').doc(this.userID).set({
  //     userData.email,
  //   });
  // }

login(authData: AuthData) {
  this.afAuth.auth
    .signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.authSuccessfully();
      console.log(result);
      this.userID = result.user.uid;
      this.userEmail = result.user.email;
    })
    .catch(error => {
      console.log(error);
    });
}

logout() {
  this.authChange.next(false);
  this.router.navigate(['/']);
  this.isAuthenticated = false;
}


isAuth() {
  return this.isAuthenticated;
}

private authSuccessfully() {
  this.isAuthenticated = true;
  this.authChange.next(true);
  this.router.navigate(['/tools']);
}
private registerSuccessfully() {
  this.isAuthenticated = true;
  this.authChange.next(true);
  this.router.navigate(['/auth/signup/details']);
}

getUserID() {
  return this.userID;
}
getUserEmail() {
  return this.userEmail;

}
}
