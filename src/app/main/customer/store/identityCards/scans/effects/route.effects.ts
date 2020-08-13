import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as identificationCardScanActions from '../scans.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class CustomerIdentificationCardScanRouteEffects {
  @Effect({ dispatch: false })
  createIdentificationCardScanSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCardScanActions.CREATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
