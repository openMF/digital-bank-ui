import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as denominationActions from '../denomination.actions';
import { map, tap } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class TellerDenominationRouteEffects {
  @Effect({ dispatch: false })
  createDenominationSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(denominationActions.CREATE_DENOMINATION_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => {
      this.router.navigate(['../'], { relativeTo: payload.activatedRoute });
    }),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
