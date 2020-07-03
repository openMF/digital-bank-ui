import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as securityActions from '../security.actions';

@Injectable()
export class SecurityRouteEffects {
  @Effect({ dispatch: false })
  loginSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.LOGIN_SUCCESS),
    tap(payload => this.router.navigate(['/'])),
  );

  @Effect({ dispatch: false })
  logoutSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.LOGOUT_SUCCESS),
    tap(payload => this.router.navigate(['/login'])),
  );

  @Effect({ dispatch: false })
  passwordChangeSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.CHANGE_PASSWORD_SUCCESS),
    tap(payload => this.router.navigate(['/'])),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
