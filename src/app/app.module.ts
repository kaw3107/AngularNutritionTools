import { StripHtmlTagsPipe } from 'src/app/pipes/strip-html-tags.pipe';
import { UserService } from './user-dashboard/user.service';
import { AuthGuard } from './auth/auth.guard';
import { routing } from './routers/app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FeedService } from 'src/app/blog/feed.service';


import { AuthService } from 'src/app/auth/auth.service';
import { HeaderComponent } from './home/header/header.component';

import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { SharedModule } from './shared/shared.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-dashboard/user-profile/user-profile.component';
import { SignUpDetailsComponent } from './auth/sign-up/sign-up-details/sign-up-details.component';
import { FeedCardComponent } from './blog/feed-card/feed-card.component';
import { AuthDashboardComponent } from './auth/auth-dashboard/auth-dashboard.component';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { AddDialogComponent } from '../app/tools/cardio-tracking/dialogs/add.dialog/add.dialog.component';
import { DeleteDialogComponent, } from '../app/tools/cardio-tracking/dialogs/delete.dialog/delete.dialog.component';
import { EditDialogComponent } from '../app/tools/cardio-tracking/dialogs/edit.dialog/edit.dialog.component';
import { ListExercisesComponent } from './tools/cardio-tracking/list-exercises/list-exercises.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    BlogComponent,
    SignUpComponent,
    LoginComponent,
    UserProfileComponent,
    SignUpDetailsComponent,
    FeedCardComponent,
    StripHtmlTagsPipe,
    UserDashboardComponent,
    AuthDashboardComponent,
    AppNavigationComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    // ListExercisesComponent
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
    AngularFireDatabaseModule,
    SharedModule,
    HttpModule,
    HttpClientModule
  ],
  entryComponents: [ListExercisesComponent, AddDialogComponent],
  providers: [AuthService, UserService, FeedService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
