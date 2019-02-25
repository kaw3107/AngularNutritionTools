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
  genderStore = '';
  weightVar = 0;
  ageVar = 0;
  heightVar = 0;

  constructor() { }

  ngOnInit() {
    this.genderStore = 'Male';
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 30 && value <= 210) {
      return value  ;
    }

    return value;
  }

  onSubmit() {
    this.genderVar = this.bmrForm.controls['gender'].value;
    this.weightVar = this.bmrForm.controls['weight'].value;
    this.ageVar = this.bmrForm.controls['age'].value;
    this.heightVar = this.bmrForm.controls['height'].value;

    if (this.genderVar === '') {
      this.genderVar = 'm'
    }

    if (this.genderVar === 'm') {
      this.genderStore = 'Male';
    } else if (this.genderVar === 'f') {
      this.genderStore = 'Female';
    }
    this.calcBMR();
  }

  calcBMR() {

    if (this.genderVar === 'm') {
      const weightMultiplier = 10;
      const heightMultiplier = 6.25;
      const ageMultiplier = 5;
      const maleAddVal = 5;
      this.bmrVar = Math.round((weightMultiplier * this.weightVar) +
            (heightMultiplier * this.heightVar) - (ageMultiplier * this.ageVar) + maleAddVal);
    } else if (this.genderVar === 'f') {
      const weightMultiplier = 10;
      const heightMultiplier = 6.25;
      const ageMultiplier = 5;
      const femaleSubVal = 161;
      this.bmrVar = Math.round((weightMultiplier * this.weightVar) +
          (heightMultiplier * this.heightVar) - (ageMultiplier * this.ageVar) - femaleSubVal);
    }
  }

  reset() {
    this.bmrVar = 0;
    this.genderVar = '';
    this.weightVar = 0;
    this.ageVar = 0;
    this.heightVar = 0;
    this.bmrForm.reset();

  }
}
