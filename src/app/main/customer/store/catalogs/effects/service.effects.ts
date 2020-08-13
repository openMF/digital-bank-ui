import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import * as catalogActions from '../catalog.actions';
import { CatalogService } from '../../../../../services/catalog/catalog.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class CatalogApiEffects {
  @Effect()
  createCatalog$: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.CREATE),
    map((action: catalogActions.CreateCatalogAction) => action.payload),
    mergeMap(payload =>
      this.catalogService.createCatalog(payload.catalog).pipe(
        map(() => new catalogActions.CreateCatalogSuccessAction(payload)),
        catchError(error => of(new catalogActions.CreateCatalogFailAction(error))),
      ),
    ),
  );

  @Effect()
  deleteCatalog$: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.DELETE),
    map((action: catalogActions.DeleteCatalogAction) => action.payload),
    mergeMap(payload =>
      this.catalogService.deleteCatalog(payload.catalog).pipe(
        map(() => new catalogActions.DeleteCatalogSuccessAction(payload)),
        catchError(error => of(new catalogActions.DeleteCatalogFailAction(error))),
      ),
    ),
  );

  @Effect()
  updateField$: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.UPDATE_FIELD),
    map((action: catalogActions.UpdateFieldAction) => action.payload),
    mergeMap(payload =>
      this.catalogService.updateField(payload.catalogIdentifier, payload.field).pipe(
        map(() => new catalogActions.UpdateFieldSuccessAction(payload)),
        catchError(error => of(new catalogActions.UpdateFieldFailAction(error))),
      ),
    ),
  );

  @Effect()
  deleteField$: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.DELETE_FIELD),
    map((action: catalogActions.DeleteFieldAction) => action.payload),
    mergeMap(payload =>
      this.catalogService.deleteField(payload.catalogIdentifier, payload.field).pipe(
        map(() => new catalogActions.DeleteFieldSuccessAction(payload)),
        catchError(error => of(new catalogActions.DeleteFieldFailAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private catalogService: CatalogService) {}
}
