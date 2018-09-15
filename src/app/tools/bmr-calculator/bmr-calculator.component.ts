import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-bmr-calculator',
  templateUrl: './bmr-calculator.component.html',
  styleUrls: ['./bmr-calculator.component.scss']
})
export class BMRCalculatorComponent implements OnInit {
  bmrForm = new FormGroup({
  weight: new FormControl(0),
  height: new FormControl(0),
  age: new FormControl(0),
  gender: new FormControl(''),
  });

  bmrVar = 0;
  genderVar = '';
  weightVar = 0;
  ageVar = 0;
  heightVar = 0;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.genderVar = this.bmrForm.controls['gender'].value;
    this.weightVar = this.bmrForm.controls['weight'].value;
    this.ageVar = this.bmrForm.controls['age'].value;
    this.heightVar = this.bmrForm.controls['height'].value;

    this.calcMacros();

    console.log(this.bmrVar);
  }

  calcMacros() {

    if(this.genderVar === 'm') {
      const weightMultiplier = 10;
      const heightMultiplier = 6.25;
      const ageMultiplier = 5;
      const maleAddVal = 5;
      this.bmrVar = (weightMultiplier * this.weightVar) + (heightMultiplier * this.heightVar) - (ageMultiplier * this.ageVar) + maleAddVal;
    } else if(this.genderVar === 'f') {
      const weightMultiplier = 10;
      const heightMultiplier = 6.25;
      const ageMultiplier = 5;
      const femaleSubVal = 161;
      this.bmrVar = (weightMultiplier * this.weightVar) + 
          (heightMultiplier * this.heightVar) - (ageMultiplier * this.ageVar) - femaleSubVal;
    }
  }

}
