import { map, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as definitionActions from '../product.actions';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class DepositProductDefinitionRouteEffects {
  @Effect({ dispatch: false })
  createProductDefinitionSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(definitionActions.CREATE_SUCCESS, definitionActions.UPDATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  @Effect({ dispatch: false })
  deleteProductDefinitionSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(definitionActions.DELETE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../../'], { relativeTo: payload.activatedRoute })),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
