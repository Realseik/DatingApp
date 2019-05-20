import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }
    this.alertify.error('No estas logueado!');
    this.router.navigate(['/hombe']);
    return false
  }
}
