import { Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as taskActions from '../task.actions';
import { map, tap } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class TasksRouteEffects {
  @Effect({ dispatch: false })
  createCustomerTaskSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.CREATE_SUCCESS, taskActions.UPDATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
