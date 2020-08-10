import { catchError, map, takeUntil, skip, switchMap, debounceTime, mergeMap } from 'rxjs/operators';
import * as definitionActions from '../product.actions';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DepositAccountService } from '../../../../services/depositAccount/deposit-account.service';
import { emptySearchResult } from '../../../common/store/search.reducer';

@Injectable()
export class DepositProductDefinitionApiEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType(definitionActions.SEARCH),
    debounceTime(300),
    switchMap(() => {
      const nextSearch$ = this.actions$.pipe(ofType(definitionActions.SEARCH), skip(1));

      return this.depositService.fetchProductDefinitions().pipe(
        takeUntil(nextSearch$),
        map(
          products =>
            new definitionActions.SearchCompleteAction({
              elements: products,
              totalElements: products.length,
              totalPages: 1,
            }),
        ),
        catchError(() => of(new definitionActions.SearchCompleteAction(emptySearchResult()))),
      );
    }),
  );

  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(definitionActions.CREATE),
    map((action: definitionActions.CreateProductDefinitionAction) => action.payload),
    mergeMap(payload =>
      this.depositService.createProductDefinition(payload.productDefinition).pipe(
        map(
          () =>
            new definitionActions.CreateProductDefinitionSuccessAction({
              resource: payload.productDefinition,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new definitionActions.CreateProductDefinitionFailAction(error))),
      ),
    ),
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(definitionActions.UPDATE),
    map((action: definitionActions.UpdateProductDefinitionAction) => action.payload),
    mergeMap(payload =>
      this.depositService.updateProductDefinition(payload.productDefinition).pipe(
        map(
          () =>
            new definitionActions.UpdateProductDefinitionSuccessAction({
              resource: payload.productDefinition,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new definitionActions.UpdateProductDefinitionFailAction(error))),
      ),
    ),
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(definitionActions.DELETE),
    map((action: definitionActions.DeleteProductDefinitionAction) => action.payload),
    mergeMap(payload =>
      this.depositService.deleteProductDefinition(payload.productDefinition.identifier).pipe(
        map(
          () =>
            new definitionActions.DeleteProductDefinitionSuccessAction({
              resource: payload.productDefinition,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new definitionActions.DeleteProductDefinitionFailAction(error))),
      ),
    ),
  );

  @Effect()
  executeCommand$: Observable<Action> = this.actions$.pipe(
    ofType(definitionActions.EXECUTE_COMMAND),
    map((action: definitionActions.ExecuteCommandAction) => action.payload),
    mergeMap(payload =>
      this.depositService.processCommand(payload.definitionId, payload.command).pipe(
        map(() => new definitionActions.ExecuteCommandSuccessAction(payload)),
        catchError(error => of(new definitionActions.ExecuteCommandFailAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private depositService: DepositAccountService) {}
}
