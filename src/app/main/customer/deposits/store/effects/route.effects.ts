import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as instanceActions from '../deposit.actions';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class DepositProductInstanceRouteEffects {
  @Effect({ dispatch: false })
  createProductInstanceSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(instanceActions.CREATE_SUCCESS, instanceActions.UPDATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  @Effect({ dispatch: false })
  issueChequesSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(instanceActions.ISSUE_CHEQUES_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
