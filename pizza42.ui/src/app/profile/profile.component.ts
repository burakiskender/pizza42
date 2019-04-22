import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: any;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    if (this.authService.userProfile) {
      this.userProfile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, result) => {
        this.userProfile = result;
      });
    }

  }

}
