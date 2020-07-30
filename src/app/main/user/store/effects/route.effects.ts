import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as roleActions from '../user.actions';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class RoleRouteEffects {
  @Effect({ dispatch: false })
  createRoleSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(roleActions.CREATE_SUCCESS, roleActions.UPDATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  @Effect({ dispatch: false })
  deleteRoleSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(roleActions.DELETE_SUCCESS),
    tap(payload => this.router.navigate(['/roles'])),
    // map((action: RouteAction) => action.payload),
    // tap(payload => this.router.navigate(['../../'], { relativeTo: payload.activatedRoute })),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
