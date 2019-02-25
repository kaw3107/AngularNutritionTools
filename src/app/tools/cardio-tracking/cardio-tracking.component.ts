import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

export interface Exercise {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cardio-tracking',
  templateUrl: './cardio-tracking.component.html',
  styleUrls: ['./cardio-tracking.component.scss']
})
export class CardioTrackingComponent implements OnInit {
  cardioTrackerForm = new FormGroup({
    exerciseCtrl: new FormControl(0),
    durationCtrl: new FormControl(0),
    caloriesCtrl: new FormControl(0),
    });
    exercises: Exercise[] = [
      { value: 'Walking', viewValue: 'Walking' },
      { value: '2', viewValue: 'Light Physical Activity' },
      { value: '3', viewValue: 'Moderate Physical Activity' },
      { value: '4', viewValue: 'Vigorous Physical Activity' },
    ];

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  }

}
