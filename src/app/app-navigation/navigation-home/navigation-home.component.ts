import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation-home',
  templateUrl: './navigation-home.component.html',
  styleUrls: ['./navigation-home.component.scss']
})
export class NavigationHomeComponent implements OnInit, OnDestroy {
isAuth = false;
authSubscription: Subscription;

navElementOne = String('about us');
navElementTwo = String('tools');
navElementThree = String('register');
navElementFour = String('signin');
navElementFive = String('sign out');
navElementSix = String('Profile');
navElementSeven = String('Blog');

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
