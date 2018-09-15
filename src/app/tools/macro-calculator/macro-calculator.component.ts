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

  iifymForm = new FormGroup({
    activities:  new FormControl (''),
    goal: new FormControl(''),
    height: new FormControl(0),
    weight: new FormControl(0),
    age: new FormControl(0),
    gender: new FormControl(''),
    });
    activities: Activity [] = [
    {value: '1', viewValue: 'Sedentary'},
    {value: '2', viewValue: 'Light Physical Activity'},
    {value: '3', viewValue: 'Moderate Physical Activity'},
    {value: '4', viewValue: 'Vigorous Physical Activity'},
    ];

    macroVar = 0;
    goalVar = '';
    genderVar = '';
    activityVar = '';
    weightVar = 0;
    ageVar = 0;
    heightVar = 0;
    bmrVar = 0;
    tdeeVar = 0;

    constructor() { }

    ngOnInit() {
    }

    onSubmit() {
      this.goalVar = this.iifymForm.controls['goal'].value;
      this.genderVar = this.iifymForm.controls['gender'].value;
      this.activityVar = this.iifymForm.controls['activities'].value;
      this.heightVar = this.iifymForm.controls['height'].value;
      this.weightVar = this.iifymForm.controls['weight'].value;
      this.ageVar = this.iifymForm.controls['age'].value;

      console.log(this.calcMacros());
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

    calcMacros() {
      const aggressiveCut = new Array();
      const suggestedCut = new Array();
      const maintainWeight = new Array();
      let bulkX = new Array();
      let bulkY = new Array();
      let bulkZ = new Array();

      const proteinMultiplier = 0.9;
      const fatMultiplier = 0.35;

      this.calcTDEE();

      if (this.goalVar === 'c' && this.tdeeVar > 0) {
        aggressiveCut.push(Math.round((this.tdeeVar) * 0.8));
        aggressiveCut.push(Math.round((this.weightVar * 2.2046) * proteinMultiplier));
        aggressiveCut.push(Math.round((
          (this.tdeeVar) * 0.8) -
          (this.weightVar * 2.2046) *
          proteinMultiplier * 4 -
          (this.weightVar * 2.2046) *
          fatMultiplier * 9 ) / 4);
        aggressiveCut.push(Math.round((this.weightVar * 2.2046) * fatMultiplier));
        aggressiveCut.push(Math.round(((this.tdeeVar) - (this.tdeeVar) * 0.8 ) * 7 / 3500).toFixed(2));

        suggestedCut.push(Math.round((this.tdeeVar) * 0.85));
        suggestedCut.push(Math.round((this.weightVar * 2.2046) * proteinMultiplier));
        suggestedCut.push(Math.round((
          (this.tdeeVar) * 0.85) -
          (this.weightVar * 2.2046) *
          proteinMultiplier * 4 -
          (this.weightVar * 2.2046) *
          fatMultiplier * 9 ) / 4);
          suggestedCut.push(Math.round((this.weightVar * 2.2046) * fatMultiplier));
          suggestedCut.push(Math.round(((this.tdeeVar) - (this.tdeeVar) * 0.85 ) * 7 / 3500).toFixed(2));

          maintainWeight.push(Math.round((this.tdeeVar)));
          maintainWeight.push(Math.round((this.weightVar * 2.2046) * proteinMultiplier));
          maintainWeight.push(Math.round((
          (this.tdeeVar)) -
          (this.weightVar * 2.2046) *
          proteinMultiplier * 4 -
          (this.weightVar * 2.2046) *
          fatMultiplier * 9 ) / 4);
          maintainWeight.push(Math.round((this.weightVar * 2.2046) * fatMultiplier));
      }

      console.log(aggressiveCut);

    }

    }
