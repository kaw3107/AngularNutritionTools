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

  tdeeVar: number;
  goalVar: string;
  genderVar: string;
  genderStore: string;
  activityVar: string;
  activityStore: string;
  selectedValue: string;
  selected: string;
  weightVar: number;
  ageVar: number;
  heightVar: number;
  bmrVar: number;
  constructor() {
    super();
   }

  ngOnInit() {
    this.genderStore = 'Male';
    this.selectedValue = this.activities
    .map(s => s.value).filter(s => s.toString() === '1').toString();
  }

  onSubmit() {
  
    this.genderVar = this.tdeeForm.controls['gender'].value;
    this.activityVar = this.tdeeForm.controls['activities'].value;
    this.heightVar = this.tdeeForm.controls['height'].value;
    this.weightVar = this.tdeeForm.controls['weight'].value;
    this.ageVar = this.tdeeForm.controls['age'].value;

    this.valueConverter();

    super.setGender(this.genderVar);
    super.setAge(this.ageVar);
    super.setWeight(this.weightVar);
    super.setHeight(this.heightVar);
    super.setActivity(this.activityVar);

    // super.onSubmit();
    this.tdeeVar = super.onCallTdee();
  }

  valueConverter() {
    if (this.genderVar === '') {
      this.genderVar = 'm'
    }
    if (this.genderVar === 'm') {
      this.genderStore = 'Male';
    } else if (this.genderVar === 'f') {
      this.genderStore = 'Female';
    }

    switch(this.activityVar) { 
      case '1': { 
         this.activityStore = 'Sedentary';
         break; 
      } 
      case '2': { 
        this.activityStore = 'Light Physical Activity';
         break; 
      } 
      case "3": {
        this.activityStore = 'Moderate Physical Activity';
         break;    
      } 
      case "4": { 
         this.activityStore = 'Vigorous Physical Activity';
         break; 
      }
      default: {
        this.activityStore ='Sedentary';
      }  
    }
  }
}
