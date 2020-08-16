import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as tellerActions from '../teller.actions';
import { map, tap } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class TellerRouteEffects {
  @Effect({ dispatch: false })
  createTellerSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(tellerActions.CREATE_TELLER_SUCCESS, tellerActions.UPDATE_TELLER_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => {
      this.router.navigate(['../'], { relativeTo: payload.activatedRoute });
    }),
  );

  @Effect({ dispatch: false })
  executeCommandSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(tellerActions.EXECUTE_COMMAND_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => {
      this.router.navigate(['../'], { relativeTo: payload.activatedRoute });
    }),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
