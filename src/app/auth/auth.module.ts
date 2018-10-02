import { AppNavigationComponent } from './../app-navigation/app-navigation.component';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ToolsModule } from '../tools/tools.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from 'src/app/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpDetailsComponent } from './sign-up/sign-up-details/sign-up-details.component';


@NgModule({
    imports: [
      MaterialModule,
      CommonModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [
        SignUpComponent,
        LoginComponent,
        SignUpDetailsComponent,
        AppNavigationComponent
    ],
    exports: [],

    providers: [AuthService],
})
export class AuthModule { }
