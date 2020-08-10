import * as dividendActions from '../dividend.actions';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class DepositProductDividendRouteEffects {
  @Effect({ dispatch: false })
  createDividendDistributionSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(dividendActions.CREATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
