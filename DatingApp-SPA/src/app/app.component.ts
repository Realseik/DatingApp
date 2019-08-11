import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.auth.decodedtoken = this.jwtHelper.decodeToken(token);
    }
    if (currentUser) {
      this.auth.currentUser = currentUser;
      this.auth.changeMemberPhoto(currentUser.photoUrl);
    }
  }
}
