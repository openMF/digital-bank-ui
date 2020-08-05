import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as userActions from '../user.actions';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class UserRouteEffects {
  @Effect({ dispatch: false })
  createUserSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.CREATE_SUCCESS, userActions.UPDATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  @Effect({ dispatch: false })
  deleteUserSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.DELETE_SUCCESS),
    tap(payload => this.router.navigate(['/users'])),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../../'], { relativeTo: payload.activatedRoute })),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
