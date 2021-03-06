import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../services/alertify.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from '../services/user.service';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(router: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(router.params['id']).pipe(
      catchError(error => {
        this.alertify.error('Problem recibiendo datos');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
