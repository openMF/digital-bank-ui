import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as payrollActions from '../payroll.actions';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class CustomerPayrollRouteEffects {
  @Effect({ dispatch: false })
  updatePayrollSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(payrollActions.UPDATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
