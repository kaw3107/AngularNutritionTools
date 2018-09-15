import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-calorie-calculator',
  templateUrl: './calorie-calculator.component.html',
  styleUrls: ['./calorie-calculator.component.scss']
})
export class CalorieCalculatorComponent implements OnInit {

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

      console.log(this.caloriesVar);
    }

    calcMacros() {
     this.caloriesVar = this.carbVar * 4 + this.proteinVar * 4 + this.fatVar * 9;
    }
}
