import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './../routers/tools-routing.module';
import { MaterialModule } from './../material.module';
import { NavigationMainComponent } from '../app-navigation/navigation-main/navigation-main.component';
import { CalorieCalculatorComponent } from 'src/app/tools/calorie-calculator/calorie-calculator.component';
import { MacroCalculatorComponent } from 'src/app/tools/macro-calculator/macro-calculator.component';
import { ToolsStartComponent } from 'src/app/tools/tools-start/tools-start.component';
import { BMRCalculatorComponent } from 'src/app/tools/bmr-calculator/bmr-calculator.component';
import { ToolsModule } from '../tools/tools.module';


@NgModule({
  imports: [ CommonModule, routing, MaterialModule,],
  exports : [
    CommonModule,
    FormsModule,
    NavigationMainComponent,
    CalorieCalculatorComponent,
    MacroCalculatorComponent,
    ToolsStartComponent,
    BMRCalculatorComponent,
    
  ],
  declarations: [ 
    NavigationMainComponent,
    CalorieCalculatorComponent,
    MacroCalculatorComponent,
    ToolsStartComponent,
    BMRCalculatorComponent,

   ],
})
export class SharedModule { }