import { AppNavigationComponent } from './../app-navigation/app-navigation.component';
import { TdeeCalculatorComponent } from './../tools/tdee-calculator/tdee-calculator.component';
import { AuthGuard } from './../auth/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './../routers/tools-routing.module';
import { MaterialModule } from './../material.module';
import { CalorieCalculatorComponent } from 'src/app/tools/calorie-calculator/calorie-calculator.component';
import { MacroCalculatorComponent } from 'src/app/tools/macro-calculator/macro-calculator.component';
import { ToolsStartComponent } from 'src/app/tools/tools-start/tools-start.component';
import { BMRCalculatorComponent } from 'src/app/tools/bmr-calculator/bmr-calculator.component';
import { ToolsModule } from '../tools/tools.module';


@NgModule({
  imports: [
    CommonModule,
    routing,
    MaterialModule,
    ReactiveFormsModule,
    ToolsModule
  ],
  exports : [
    CommonModule,
    FormsModule,
    AppNavigationComponent,
    CalorieCalculatorComponent,
    MacroCalculatorComponent,
    ToolsStartComponent,
    BMRCalculatorComponent,
    TdeeCalculatorComponent
  ],
  declarations: [
    AppNavigationComponent,
    CalorieCalculatorComponent,
    MacroCalculatorComponent,
    ToolsStartComponent,
    BMRCalculatorComponent,
    TdeeCalculatorComponent
   ],
   providers: [AuthService, AuthGuard],
})
export class SharedModule { }
