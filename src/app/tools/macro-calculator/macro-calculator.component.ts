import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

export interface Activity {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-macro-calculator',
  templateUrl: './macro-calculator.component.html',
  styleUrls: ['./macro-calculator.component.scss']
})
export class MacroCalculatorComponent implements OnInit {
  show = true;
  goalSwitch = false;
  step = 0;
  iifymForm = new FormGroup({
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

  macroVar: number;
  goalVar: string;
  goalStore: string;
  genderVar: string;
  genderStore: string;
  activityVar: string;
  activityStore: string;
  selectedValue: string;
  weightVar: number;
  ageVar: number;
  heightVar: number;
  bmrVar: number;
  tdeeVar: number;
  proteinMultiplier = 0.9;
  fatMultiplier = 0.35;

// Need to refactor and make a model for the below... Low priority
  kcalCut1: string;
  proteinCut1: string;
  carbCut1 = '0';
  fatCut1: string;
  lossPWCut1: string;

  kcalCut2: string;
  proteinCut2: string;
  carbCut2: string;
  fatCut2: string;
  lossPWCut2: string;

  kcalBulk1: string;
  proteinBulk1: string;
  carbBulk1: string;
  fatBulk1: string;
  gainPWBulk1: string;

  kcalBulk2: string;
  proteinBulk2: string;
  carbBulk2: string;
  fatBulk2: string;
  gainPWBulk2: string;

  kcalMaintain: string;
  proteinMaintain: string;
  carbMaintain: string;
  fatMaintain: string;

  constructor() { }

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  ngOnInit() {
    this.selectedValue = this.activities
    .map(s => s.value).filter(s => s.toString() === '1').toString();
  }


  onSubmit() {
    this.goalVar = this.iifymForm.controls['goal'].value;
    this.genderVar = this.iifymForm.controls['gender'].value;
    this.activityVar = this.iifymForm.controls['activities'].value;
    this.heightVar = this.iifymForm.controls['height'].value;
    this.weightVar = this.iifymForm.controls['weight'].value;
    this.ageVar = this.iifymForm.controls['age'].value;
    this.valueConverter();

    this.calcMacros();

  }

  setGender (x: string) {
    this.genderVar = x;
  }
  setAge (x: number) {
    this.ageVar = x;
  }
  setWeight (x: number) {
    this.weightVar = x;
  }
  setHeight (x: number) {
    this.heightVar = x;
  }
  setActivity (x: string) {
    this.activityVar = x;
  }

  onCallTdee() {
    this.calcTDEE();
    return Math.round(this.tdeeVar);
  }

  calcBMR() {
    if (this.genderVar === 'm') {
      const weightMultiplier = 10;
      const heightMultiplier = 6.25;
      const ageMultiplier = 5;
      const maleAddVal = 5;
      this.bmrVar =
        (weightMultiplier * this.weightVar) +
        (heightMultiplier * this.heightVar) -
        (ageMultiplier * this.ageVar) + maleAddVal;
    } else if (this.genderVar === 'f') {
      const weightMultiplier = 10;
      const heightMultiplier = 6.25;
      const ageMultiplier = 5;
      const femaleSubVal = 161;
      this.bmrVar =
        (weightMultiplier * this.weightVar) +
        (heightMultiplier * this.heightVar) -
        (ageMultiplier * this.ageVar) - femaleSubVal;
    }
  }

  calcTDEE() {

    const levelOne = 1.2;
    const levelTwo = 1.418;
    const levelThree = 1.55;
    const levelFour = 1.637;

    this.calcBMR();

    if (this.activityVar === '1' && this.bmrVar > 0) {
      this.tdeeVar = this.bmrVar * levelOne;
    } else if (this.activityVar === '2' && this.bmrVar > 0) {
      this.tdeeVar = this.bmrVar * levelTwo;
    } else if (this.activityVar === '3' && this.bmrVar > 0) {
      this.tdeeVar = this.bmrVar * levelThree;
    } else if (this.activityVar === '4' && this.bmrVar > 0) {
      this.tdeeVar = this.bmrVar * levelFour;
    }
  }

  calcCut1() {
    const cut1 = new Array();
    cut1.push(Math.round((this.tdeeVar) * 0.8));
    cut1.push(Math.round((this.weightVar * 2.2046) * this.proteinMultiplier));
    cut1.push(Math.round((
      ((this.tdeeVar) * 0.8) -
      (this.weightVar * 2.2046) *
      this.proteinMultiplier * 4 -
      (this.weightVar * 2.2046) *
      this.fatMultiplier * 9) / 4));
    cut1.push(Math.round((this.weightVar * 2.2046) * this.fatMultiplier));
    cut1.push((((this.tdeeVar) - (this.tdeeVar) * 0.8) * 7 / 3500).toFixed(2));

    this.kcalCut1 = cut1[0];
    this.proteinCut1 = cut1[1];
    this.carbCut1 = cut1[2];
    this.fatCut1 = cut1[3];
    this.lossPWCut1 = cut1[4];
  }

  calcCut2() {
    const cut2 = new Array();
    cut2.push(Math.round((this.tdeeVar) * 0.85));
    cut2.push(Math.round((this.weightVar * 2.2046) * this.proteinMultiplier));
    cut2.push(Math.round((
      ((this.tdeeVar) * 0.85) -
      (this.weightVar * 2.2046) *
      this.proteinMultiplier * 4 -
      (this.weightVar * 2.2046) *
      this.fatMultiplier * 9) / 4));
    cut2.push(Math.round((this.weightVar * 2.2046) * this.fatMultiplier));
    cut2.push((((this.tdeeVar) - (this.tdeeVar) * 0.85) * 7 / 3500).toFixed(2));

    this.kcalCut2 = cut2[0];
    this.proteinCut2 = cut2[1];
    this.carbCut2 = cut2[2];
    this.fatCut2 = cut2[3];
    this.lossPWCut2 = cut2[4];
  }

  calcMaintainWeight() {
    const maintainWeight = new Array();

    maintainWeight.push(Math.round((this.tdeeVar)));
    maintainWeight.push(Math.round((this.weightVar * 2.2046) * this.proteinMultiplier));
    maintainWeight.push(Math.round(
      (this.tdeeVar) -
      (this.weightVar * 2.2046) *
      this.proteinMultiplier * 4 -
      (this.weightVar * 2.2046) *
      this.fatMultiplier * 9 / 4));
    maintainWeight.push(Math.round((this.weightVar * 2.2046) * this.fatMultiplier));

    this.kcalMaintain = maintainWeight[0];
    this.proteinMaintain = maintainWeight[1];
    this.carbMaintain = maintainWeight[2];
    this.fatMaintain = maintainWeight[3];

  }

  calcBulk1() {
    const bulk1 = new Array();

    bulk1.push(Math.round((this.tdeeVar) * 1.05));
    bulk1.push(Math.round((this.weightVar * 2.2046) * this.proteinMultiplier));
    bulk1.push(Math.round((
      ((this.tdeeVar) * 1.05) -
      (this.weightVar * 2.2046) *
      this.proteinMultiplier * 4 -
      (this.weightVar * 2.2046) *
      this.fatMultiplier * 9) / 4));
    bulk1.push(Math.round((this.weightVar * 2.2046) * this.fatMultiplier));
    bulk1.push((((this.tdeeVar) - (this.tdeeVar) * 1.05) * 7 / 3500).toFixed(2));

    this.kcalBulk1 = bulk1[0];
    this.proteinBulk1 = bulk1[1];
    this.carbBulk1 = bulk1[2];
    this.fatBulk1 = bulk1[3];
    this.gainPWBulk1 = bulk1[4];

  }

  calcBulk2() {
    const bulk2 = new Array();

    bulk2.push(Math.round((this.tdeeVar) * 1.1));
    bulk2.push(Math.round((this.weightVar * 2.2046) * this.proteinMultiplier));
    bulk2.push(Math.round((
      ((this.tdeeVar) * 1.1) -
      (this.weightVar * 2.2046) *
      this.proteinMultiplier * 4 -
      (this.weightVar * 2.2046) *
      this.fatMultiplier * 9) / 4));
    bulk2.push(Math.round((this.weightVar * 2.2046) * this.fatMultiplier));
    bulk2.push((((this.tdeeVar) - (this.tdeeVar) * 1.1) * 7 / 3500).toFixed(2));

    this.kcalBulk2 = bulk2[0];
    this.proteinBulk2 = bulk2[1];
    this.carbBulk2 = bulk2[2];
    this.fatBulk2 = bulk2[3];
    this.gainPWBulk2 = bulk2[4];
  }

  calcMacros() {
    this.calcTDEE();

    if (this.goalVar === 'c' && this.tdeeVar > 0) {
      this.calcCut1();
      this.calcCut2();
      this.calcMaintainWeight();
      this.goalSwitch = false;
    } else if (this.goalVar === 'b' && this.tdeeVar > 0) {
      this.calcBulk1();
      this.calcBulk2();
      this.calcMaintainWeight();
      this.onRemoveNegative();
      this.goalSwitch = true;
      }
    }

  onRemoveNegative() {
    let s1 = this.gainPWBulk1;
    let s2 = this.gainPWBulk2;

      while (s1.charAt(0) === '-' && s2.charAt(0) ) {
       s1 = s1.substr(1);
       s2 = s2.substr(1);
        }
      this.gainPWBulk1 = s1;
      this.gainPWBulk2 = s2;
  }

  valueConverter() {
    if (this.genderVar === '' && this.goalVar === '') {
      this.genderVar = 'm';
      this.goalVar = 'c';
    }
    if (this.genderVar === 'm') {
      this.genderStore = 'Male';
    } else if (this.genderVar === 'f') {
      this.genderStore = 'Female';
    }

    // if (this.genderVar === 'm') {
    //   this.genderStore = 'Male';
    // } else if (this.genderVar === 'f') {
    //   this.genderStore = 'Female';
    // }

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
