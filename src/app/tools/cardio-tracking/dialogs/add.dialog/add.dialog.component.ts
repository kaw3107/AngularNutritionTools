import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit  } from '@angular/core';
import { CardioTrackingService } from '../.././cardio-tracking.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Exercise } from '../../../../models/exercises.model';
import moment from 'moment';

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  exercise: '';
  duration: '';
  calories: '';
  dateAdded: string;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Exercise,
    public cardioTrackingService: CardioTrackingService) { }

    cardioTrackerForm = new FormGroup({
      exerciseCtrl: new FormControl(''),
      durationCtrl: new FormControl(''),
      caloriesCtrl: new FormControl(''),
      });

ngOnInit() {
}
submit() {
}

getDate() {
  let currentDateTime = moment().format('DD-MM-YYYY');
  this.dateAdded = currentDateTime;
}

onNoClick(): void {
this.dialogRef.close();
}

public confirmAdd(): void {
  this.getDate();
  const form = this.cardioTrackerForm;
  this.exercise = this.cardioTrackerForm.controls['exerciseCtrl'].value;
  this.duration = this.cardioTrackerForm.controls['durationCtrl'].value;
  this.calories = this.cardioTrackerForm.controls['caloriesCtrl'].value;
  if (form.invalid) {
    return;
  }
  this.cardioTrackingService.addExercise(this.dateAdded,this.exercise, this.duration, this.calories);
}

}
