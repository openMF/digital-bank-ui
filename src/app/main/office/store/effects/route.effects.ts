import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as officeActions from '../office.actions';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class OfficeRouteEffects {
  @Effect({ dispatch: false })
  createOfficeSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(officeActions.CREATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => {
      if (payload.resource.parentIdentifier) {
        this.router.navigate(['../detail', payload.resource.parentIdentifier], { relativeTo: payload.activatedRoute });
      } else {
        this.router.navigate(['../detail', payload.resource.identifier], { relativeTo: payload.activatedRoute });
      }
    }),
  );

  @Effect({ dispatch: false })
  updateOfficeSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(officeActions.UPDATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../../', payload.resource.identifier], { relativeTo: payload.activatedRoute })),
  );

  @Effect({ dispatch: false })
  deleteOfficeSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(officeActions.DELETE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => {
      if (payload.resource.parentIdentifier) {
        this.router.navigate(['../../', payload.resource.parentIdentifier], { relativeTo: payload.activatedRoute });
      } else {
        this.router.navigate(['../../'], { relativeTo: payload.activatedRoute });
      }
    }),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
