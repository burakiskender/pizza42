import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pizza42ui';

  constructor(public authService: AuthService) {
    console.log('app');
    authService.handleAuthenticationState();
  }

  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
      this.authService.checkSession();
    }
  }

}
