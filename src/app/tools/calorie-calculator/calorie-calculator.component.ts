import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-calorie-calculator',
  templateUrl: './calorie-calculator.component.html',
  styleUrls: ['./calorie-calculator.component.scss']
})
export class CalorieCalculatorComponent implements OnInit {
  showResult = false;
  caloriesForm = new FormGroup({
    carbs: new FormControl(0),
    protein: new FormControl(0),
    fats: new FormControl(0),
    });

    carbVar = 0;
    fatVar = 0;
    proteinVar = 0;
    caloriesVar = 0;

    constructor() { }

    ngOnInit() {
    }

    onSubmit() {
      this.carbVar = this.caloriesForm.controls['carbs'].value;
      this.fatVar = this.caloriesForm.controls['fats'].value;
      this.proteinVar = this.caloriesForm.controls['protein'].value;

      this.calcMacros();

      this.showResult = true;
    }

    calcMacros() {
     this.caloriesVar = this.carbVar * 4 + this.proteinVar * 4 + this.fatVar * 9;
    }

    reset() {
      this.carbVar = 0;
      this.fatVar = 0;
      this.proteinVar = 0;
      this.caloriesVar = 0;
      this.caloriesForm.reset();
      this.showResult = false;

    }

    onReturn() {
      this.showResult = false;
    }
}
