import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as identificationCardActions from '../identity-cards.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class CustomerIdentificationCardRouteEffects {
  @Effect({ dispatch: false })
  createIdentificationCardSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCardActions.CREATE_SUCCESS, identificationCardActions.UPDATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  @Effect({ dispatch: false })
  deleteIdentificationCardSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCardActions.DELETE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../../../../../../'], { relativeTo: payload.activatedRoute })),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
