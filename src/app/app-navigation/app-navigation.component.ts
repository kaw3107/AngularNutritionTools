import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

 @Component({
   selector: 'app-app-navigation',
   templateUrl: './app-navigation.component.html',
   styleUrls: ['./app-navigation.component.scss']
 })
export class AppNavigationComponent implements OnInit, OnDestroy {
isAuth = false;
authSubscription: Subscription;
  constructor(private authService: AuthService) { }

   ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  isAuthenticated() {
    if (this.authService.isAuth()) {
      return true;
    } else {
      return false;
    }
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
   }

 }
