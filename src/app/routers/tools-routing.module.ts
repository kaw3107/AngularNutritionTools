
import { MacroCalculatorComponent } from 'src/app/tools/macro-calculator/macro-calculator.component';
import { CalorieCalculatorComponent } from './../tools/calorie-calculator/calorie-calculator.component';
import { BMRCalculatorComponent } from 'src/app/tools/bmr-calculator/bmr-calculator.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './../auth/auth.guard';
import { TdeeCalculatorComponent } from '../tools/tdee-calculator/tdee-calculator.component';
import { CardioTrackingComponent } from 'src/app/tools/cardio-tracking/cardio-tracking.component';


export const routes: Routes = [
  { path: 'calories-calculator', component: CalorieCalculatorComponent},
  { path: 'macro-calculator', component: MacroCalculatorComponent},
  { path: 'bmr-calculator', component: BMRCalculatorComponent},
  { path: 'tdee-calculator', component: TdeeCalculatorComponent},
  { path: 'cardio-tracker', component: CardioTrackingComponent },
];

export const appRoutingProviders: any[] = [
  AuthGuard,
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
