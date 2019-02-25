import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


import { Exercise } from './../../models/exercises.model';

@Injectable({
  providedIn: 'root'
})
export class CardioTrackingService {
  private exercises: Exercise[] = [];
  private exercisesUpdated = new Subject<Exercise[]>();
  idStore: string;

  constructor(private http: HttpClient) {

  }

  getExercises() {
    this.http
      .get<{message: string, exercises: any }> (
        'http://localhost:3000/api/exercises'
      )
      .pipe(map((exerciseData) => {
        return exerciseData.exercises.map(exercise => {
          return {
            dateAdded: exercise.dateAdded,
            exerciseName: exercise.exerciseName,
            duration: exercise.duration,
            calories: exercise.calories,
            id: exercise._id
          };
        });
      }))
      .subscribe((transformedExerciseData) => {
        this.exercises = transformedExerciseData;
        this.exercisesUpdated.next([...this.exercises]);
      });
  }

  getExercise(id: string) {
    this.idStore = id;
    return {...this.exercises.find(e => e.id === id)}
  }

  getExerciseUpdateListener() {
    return this.exercisesUpdated.asObservable();
  }

  addExercise(dateAdded: string, exerciseName: string, duration: string, calories: string) {
    const exercise: Exercise = {id: null, dateAdded: dateAdded, exerciseName: exerciseName, duration: duration, calories: calories};
    this.http.post<{message: string, exerciseId: string}>('http://localhost:3000/api/exercises', exercise)
      .subscribe((responseData) => {
        const exerciseId = responseData.exerciseId;
        exercise.id = exerciseId;
        this.exercises.push(exercise);
        this.exercisesUpdated.next([...this.exercises]);
      });
  }

  // updateExercise(exerciseId: string, exerciseName: string, duration: string, calories: string) {
  //   const exercise: Exercise = {id: exerciseId, exerciseName: exerciseName, duration: duration, calories: calories};
  //   this.http.put('http://localhost:3000/api/exercises/' + exerciseId, exercise).
  //   subscribe(response => console.log(response));
  // }

  updateExercise(id: string, dateAdded: string, exerciseName: string, duration: string, calories: string) {
    const exercise: Exercise = { id: id, dateAdded: dateAdded, exerciseName: exerciseName, duration: duration, calories: calories };
    this.http
      .patch("http://localhost:3000/api/exercises/" + id, exercise)
      .subscribe(response => {
        const updatedExercises = [...this.exercises];
        const oldExerciseIndex = updatedExercises.findIndex(e => e.id === exercise.id);
        updatedExercises[oldExerciseIndex] = exercise;
        this.exercises = updatedExercises;
        this.exercisesUpdated.next([...this.exercises]);
        // this.router.navigate(["/"]);
      });
  }

  deleteExercise(exerciseId: string) {
    this.http.delete('http://localhost:3000/api/exercises/' + exerciseId)
      .subscribe(() => {
        const updatedExercises = this.exercises.filter(exercise => exercise.id !== exerciseId);
        this.exercises = updatedExercises;
        this.exercisesUpdated.next([...this.exercises]);
      });
  }
}
