import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit  } from '@angular/core';
import { CardioTrackingService } from '../.././cardio-tracking.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Exercise } from '../../../../models/exercises.model';
import moment from 'moment';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-edit.dialog',
  templateUrl: './edit.dialog.component.html',
  styleUrls: ['./edit.dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  exercise: Exercise;
  id: string;
  date: string;
  exerciseName: string;
  duration: string;
  calories: string;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Exercise,
    public cardioTrackingService: CardioTrackingService,
    public route: ActivatedRoute ) { }

    cardioTrackerForm = new FormGroup({
      exerciseCtrl: new FormControl(''),
      durationCtrl: new FormControl(''),
      caloriesCtrl: new FormControl(''),
      });

  ngOnInit() {
    this.id = this.data.id;
    this.date = this.data.dateAdded;
    this.cardioTrackerForm.get('exerciseCtrl').setValue(this.data.exerciseName);
    this.cardioTrackerForm.get('durationCtrl').setValue(this.data.duration);
    this.cardioTrackerForm.get('caloriesCtrl').setValue(this.data.calories);
    console.log(this.date);
  }
    

  onNoClick(): void {
    this.dialogRef.close();
    }

    confirmEdit() {
      const form = this.cardioTrackerForm;
      this.exerciseName = this.cardioTrackerForm.controls['exerciseCtrl'].value;
      this.duration = this.cardioTrackerForm.controls['durationCtrl'].value;
      this.calories = this.cardioTrackerForm.controls['caloriesCtrl'].value;
      if (form.invalid) {
        return;
      }
      this.cardioTrackingService.updateExercise(this.id, this.date, this.exerciseName, this.duration, this.calories);
    }

    }
