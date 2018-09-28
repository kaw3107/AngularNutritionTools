import { UserService } from './../../../user-dashboard/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';



@Component({
  selector: 'app-sign-up-details',
  templateUrl: './sign-up-details.component.html',
  styleUrls: ['./sign-up-details.component.scss']
})
export class SignUpDetailsComponent implements OnInit {
  isLinear = true;
  minDate = moment().subtract(90, 'years').toDate();
  maxDate = moment().subtract(16, 'years').toDate();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  userFirstName: string;
  userSecondName: string;
  userDOB: Date;
  userWeight: number;
  userHeight: number;
  userGender: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService ) { }

  ngOnInit() {
    this.initForm();
    this.userService.ngOnInit();
    console.log(this.userService.userID);
    console.log(this.userService.email);
  }

  initForm() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
    });
  }

  setFormData() {
    this.userFirstName = this.firstFormGroup.controls['firstCtrl'].value;
    this.userSecondName = this.firstFormGroup.controls['secondCtrl'].value;
    this.userDOB = this.secondFormGroup.controls['firstCtrl'].value;
    this.userWeight = this.secondFormGroup.controls['secondCtrl'].value;
    this.userHeight = this.secondFormGroup.controls['thirdCtrl'].value;
    this.userGender = this.secondFormGroup.controls['fourthCtrl'].value;
  }

  onSubmit() {

    this.setFormData();

    this.userService.createUserDetails({
      id: this.userService.userID,
      email: this.userService.email,
      displayName: this.userFirstName + ' ' + this.userSecondName,
      firstName: this.userFirstName,
      lastName: this.userSecondName,
      gender: this.userGender,
      dob: this.userDOB.toLocaleDateString(),
      weight: this.userWeight,
      height: this.userHeight,
    });
  }
}
