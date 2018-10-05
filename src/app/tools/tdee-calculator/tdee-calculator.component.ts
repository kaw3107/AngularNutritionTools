import { MacroCalculatorComponent } from 'src/app/tools/macro-calculator/macro-calculator.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

export interface Activity {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-tdee-calculator',
  templateUrl: './tdee-calculator.component.html',
  styleUrls: ['./tdee-calculator.component.scss']
})

export class TdeeCalculatorComponent extends MacroCalculatorComponent implements OnInit {
  showResult = false;
  tdeeForm = new FormGroup({
    activities: new FormControl(''),
    goal: new FormControl(''),
    height: new FormControl(0),
    weight: new FormControl(0),
    age: new FormControl(0),
    gender: new FormControl(''),
  });
  activities: Activity[] = [
    { value: '1', viewValue: 'Sedentary' },
    { value: '2', viewValue: 'Light Physical Activity' },
    { value: '3', viewValue: 'Moderate Physical Activity' },
    { value: '4', viewValue: 'Vigorous Physical Activity' },
  ];

  tdeeVar = 0;
  goalVar = '';
  genderVar = '';
  activityVar = '';
  weightVar = 0;
  ageVar = 0;
  heightVar = 0;
  bmrVar = 0;
  constructor() {
    super();
   }

  ngOnInit() {
  }

  onSubmit() {
    this.genderVar = this.tdeeForm.controls['gender'].value;
    this.activityVar = this.tdeeForm.controls['activities'].value;
    this.heightVar = this.tdeeForm.controls['height'].value;
    this.weightVar = this.tdeeForm.controls['weight'].value;
    this.ageVar = this.tdeeForm.controls['age'].value;

    super.setGender(this.genderVar);
    super.setAge(this.ageVar);
    super.setWeight(this.weightVar);
    super.setHeight(this.heightVar);
    super.setActivity(this.activityVar);

    // super.onSubmit();
    this.tdeeVar = super.onCallTdee();

    this.showResult = true;
  }

  reset() {
    this.tdeeVar = 0;
    this.goalVar = '';
    this.genderVar = '';
    this.activityVar = '';
    this.weightVar = 0;
    this.ageVar = 0;
    this.heightVar = 0;
    this.bmrVar = 0;

    super.setGender(this.genderVar);
    super.setAge(this.ageVar);
    super.setWeight(this.weightVar);
    super.setHeight(this.heightVar);
    super.setActivity(this.activityVar);

    this.showResult = false;

  }

  onReturn() {
    this.showResult = false;
  }
}
