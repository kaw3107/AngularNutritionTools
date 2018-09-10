import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ToolsModule } from '../tools/tools.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from 'src/app/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationMainComponent } from '../app-navigation/navigation-main/navigation-main.component';


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
        NavigationMainComponent
    ],
    exports: [],

    providers: [AuthService],
})
export class AuthModule { }
