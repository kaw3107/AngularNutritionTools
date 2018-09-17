import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation-main',
  templateUrl: './navigation-main.component.html',
  styleUrls: ['./navigation-main.component.scss']
})
export class NavigationMainComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubscription: Subscription;
  navElementOne = String('about us');
  navElementTwo = String('tools');
  navElementThree = String('register');
  navElementFour = String('signin');
  navElementFive = String('sign out');
  navElementSix = String('profile');
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
