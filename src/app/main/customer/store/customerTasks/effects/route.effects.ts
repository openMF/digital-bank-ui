import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as taskActions from '../customer-task.actions';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class CustomerTasksRouteEffects {
  @Effect({ dispatch: false })
  executeCustomerTaskSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.EXECUTE_COMMAND_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
