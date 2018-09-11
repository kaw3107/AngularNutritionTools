import { routing } from './routers/app-routing.module';

import { AuthService } from 'src/app/auth/auth.service';
import { HeaderComponent } from './home/header/header.component';

import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { SingupFormComponent } from './home/singup-form/singup-form.component';
import { NavigationHomeComponent } from 'src/app/app-navigation/navigation-home/navigation-home.component';
import { SharedModule } from './shared/shared.module';
import { ToolsModule } from './tools/tools.module';
import {ToolsStartComponent} from './tools/tools-start/tools-start.component';
import {CalorieCalculatorComponent} from './tools/calorie-calculator/calorie-calculator.component';
import {MacroCalculatorComponent} from './tools/macro-calculator/macro-calculator.component';
import {BMRCalculatorComponent} from './tools/bmr-calculator/bmr-calculator.component';
import { NavigationMainComponent } from './app-navigation/navigation-main/navigation-main.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    BlogComponent,
    SignUpComponent,
    LoginComponent,
    SingupFormComponent,
    NavigationHomeComponent,
    UserDashboardComponent,
  ],
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    SharedModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
