import { ToolsStartComponent } from './../tools/tools-start/tools-start.component';
import { MacroCalculatorComponent } from 'src/app/tools/macro-calculator/macro-calculator.component';
import { CalorieCalculatorComponent } from './../tools/calorie-calculator/calorie-calculator.component';
import { BMRCalculatorComponent } from 'src/app/tools/bmr-calculator/bmr-calculator.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './../auth/auth.guard';

export const routes: Routes = [
  { path: 'tools', component: ToolsStartComponent}, // default route of the module
  { path: 'tools/:exerciseId', component: ToolsStartComponent},
  { path: 'calories-calculator', component: CalorieCalculatorComponent},
  { path: 'macro-calculator', component: MacroCalculatorComponent},
  { path: 'bmr-calculator', component: BMRCalculatorComponent}
];

export const appRoutingProviders: any[] = [
  AuthGuard,
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
