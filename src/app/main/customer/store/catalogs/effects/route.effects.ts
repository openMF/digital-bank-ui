import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as catalogActions from '../catalog.actions';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';

interface RouteAction extends Action {
  payload: any;
}

@Injectable()
export class CatalogRouteEffects {
  @Effect({ dispatch: false })
  createCatalogSuccess: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.CREATE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  @Effect({ dispatch: false })
  deleteCatalogSuccess: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.DELETE_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../../../'], { relativeTo: payload.activatedRoute })),
  );

  @Effect({ dispatch: false })
  updateFieldSuccess: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.UPDATE_FIELD_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../'], { relativeTo: payload.activatedRoute })),
  );

  @Effect({ dispatch: false })
  deleteFieldSuccess: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.DELETE_FIELD_SUCCESS),
    map((action: RouteAction) => action.payload),
    tap(payload => this.router.navigate(['../../../../../../'], { relativeTo: payload.activatedRoute })),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
