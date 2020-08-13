import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as customerActions from '../customer.actions';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class CustomerRouteEffects {
  @Effect({ dispatch: false })
  createCustomerSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CREATE_SUCCESS, customerActions.UPDATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
