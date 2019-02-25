import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Exercise } from './../../../models/exercises.model';
import { CardioTrackingService } from './../cardio-tracking.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ValidatorService } from 'angular4-material-table';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import {AddDialogComponent} from '../dialogs/add.dialog/add.dialog.component';
import {EditDialogComponent} from '../dialogs/edit.dialog/edit.dialog.component';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.scss']
})
export class ListExercisesComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  private exerciseSub: Subscription;
  dataSource = new ExerciseDataSource(this.cardioTrackingService);
  displayedColumns = ['dateAdded','exName', 'duration', 'calories', 'buttons', 'deleteBtns'];
  exercise: Exercise;
  private id: string;

  constructor(
    public cardioTrackingService: CardioTrackingService,
    public dialog: MatDialog,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.cardioTrackingService.getExercises();
    this.exerciseSub = this.cardioTrackingService.getExerciseUpdateListener()
      .subscribe((exercises: Exercise[]) => {
        this.exercises = exercises;
      });
  }

  ngOnDestroy() {
    this.exerciseSub.unsubscribe();
  }

  onDelete(exerciseId: string) {
    this.cardioTrackingService.deleteExercise(exerciseId);
  }

  onEdit(exerciseId: string, exerciseName: string, duration: string, calories: string) {
    this.id = exerciseId;
    this.exercise = this.cardioTrackingService.getExercise(this.id);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        id: this.exercise.id,
        dateAdded: this.exercise.dateAdded,
        exerciseName: this.exercise.exerciseName,
        duration: this.exercise.duration,
        calories: this.exercise.calories
      }
    });
  }

  addNew(exercise: Exercise) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {exercise: exercise}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }

}

export class ExerciseDataSource extends DataSource<any>  {

  constructor(private cardioTrackingService: CardioTrackingService ) {
    super();
  }

  connect(): Observable<Exercise[]> {
    return this.cardioTrackingService.getExerciseUpdateListener();
  }

  disconnect() {}
}
