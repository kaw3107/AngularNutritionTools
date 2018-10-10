import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Exercise } from './../../../models/exercises.model';
import { CardioTrackingService } from './../cardio-tracking.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ValidatorService } from 'angular4-material-table';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.scss']
})
export class ListExercisesComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  private exerciseSub: Subscription;
  dataSource = new ExerciseDataSource(this.cardioTrackingService);
  displayedColumns = ['exName', 'duration', 'calories', 'buttons'];

  constructor(public cardioTrackingService: CardioTrackingService) { }

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
