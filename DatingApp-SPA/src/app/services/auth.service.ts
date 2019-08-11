import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedtoken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(user: User) {
    return this.http.post(this.baseURL + 'login', user).pipe(
      map((response: any) => {
        const usu = response;
        if (usu) {
          localStorage.setItem('token', usu.token);
          localStorage.setItem('user', JSON.stringify(usu.user));
          this.decodedtoken = this.jwtHelper.decodeToken(usu.token);
          this.currentUser = usu.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(user: User) {
    console.log(user)
    return this.http.post(this.baseURL + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    this.decodedtoken = this.jwtHelper.decodeToken(token);
    return !this.jwtHelper.isTokenExpired(token);
  }
}
