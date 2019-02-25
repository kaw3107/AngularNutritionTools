import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { ListExercisesComponent } from './cardio-tracking/list-exercises/list-exercises.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  declarations: [
],
  exports: [
  ]
})
export class ToolsModule { }
