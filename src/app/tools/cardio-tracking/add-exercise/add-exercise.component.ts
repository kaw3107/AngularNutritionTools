import { CardioTrackingService } from './../cardio-tracking.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

export interface ExerciseOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent implements OnInit {
  exercise: '';
  duration: '';
  calories: '';

  cardioTrackerForm = new FormGroup({
    exerciseCtrl: new FormControl(''),
    durationCtrl: new FormControl(''),
    caloriesCtrl: new FormControl(''),
    });
    exercises: ExerciseOption[] = [
      { value: 'Walking', viewValue: 'Walking' },
      { value: 'Running', viewValue: 'Running' },
      { value: 'Cycling', viewValue: 'Cycling' },
      { value: 'Stair Master', viewValue: 'Stair Master' },
    ];

  constructor(private cardioTrackingService: CardioTrackingService) { }

  ngOnInit() {
  }
  onAddExercise() {
    const form = this.cardioTrackerForm;
    this.exercise = this.cardioTrackerForm.controls['exerciseCtrl'].value;
    this.duration = this.cardioTrackerForm.controls['durationCtrl'].value;
    this.calories = this.cardioTrackerForm.controls['caloriesCtrl'].value;
    if (form.invalid) {
      return;
    }
    this.cardioTrackingService.addExercise(this.exercise, this.duration, this.calories);
    form.reset();
  }
}
