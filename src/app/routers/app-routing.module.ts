import { AuthGuard } from './../auth/auth.guard';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { AboutComponent } from 'src/app/about/about.component';
import { BlogComponent } from 'src/app/blog/blog.component';
import { SignUpComponent } from 'src/app/auth/sign-up/sign-up.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'tools',  loadChildren: 'src/app/tools/tools.module#ToolsModule'},
  { path: 'auth/signup', component: SignUpComponent},
  { path: 'auth/login', component: LoginComponent},
  { path: 'user', component: UserDashboardComponent},
];

export const appRoutingProviders: any[] = [
  AuthGuard,
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
