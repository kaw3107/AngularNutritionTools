import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserData } from './../../models/user.model';
import { UserService } from './../user.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

interface User {
  displayName: string;
  userEmail: string;
}
interface UserId extends User {
  id: string;
}

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})


export class UserAccountComponent implements OnInit{
  usersCol: AngularFirestoreCollection<User>;
  users: any;
  userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;

  displayName:string;
  userEmail: string;
  inactive: boolean;

  accFormGroup: FormGroup;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    ) {}

  ngOnInit() {
    this.initForm();
    this.userService.ngOnInit();
    this.usersCol = this.db.collection('users',ref => ref.where('id', '==', this.userService.userID));
    this.users = this.usersCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });

      this.inactive = true;
      // this.setFormData();
      this.displayNameControlValueChanged();
      // // this.emailControlValueChanged();
  }

  initForm() {
    this.accFormGroup = this.formBuilder.group({
      displayNameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required]
    });
  }
    setFormData() {
      this.displayName = this.accFormGroup.controls['displayNameCtrl'].value;
      this.userEmail = this.accFormGroup.controls['emailCtrl'].value;
    }

    changeStatus() {
      this.inactive = false;
   }


displayNameControlValueChanged() {
  this.accFormGroup.get('displayNameCtrl').valueChanges.subscribe(
      (updated: string) => {
          console.log(updated);
          const update = this.db.collection('users')
          .doc(this.userService.userID)
          .update({ displayName: updated});
        });
    }

emailControlValueChanged() {
  this.accFormGroup.get('emailCtrl').valueChanges.subscribe(
      (updated: string) => {
          console.log(updated);
          const update = this.db.collection('users')
          .doc(this.userService.userID)
          .update({ email: updated });

          const user = this.afAuth.auth.currentUser;
          user.updateEmail(updated).then(function() {
            // Update successful.
          }).catch(function(error) {
            // An error happened.
          });
      });
}

onSubmit() {
  this.setFormData();
  this.displayNameControlValueChanged();
  // this.emailControlValueChanged();

}



  }
