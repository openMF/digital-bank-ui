import { DepositAccountService } from '../../../../../services/depositAccount/deposit-account.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import * as dividendActions from '../dividend.actions';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { LoadAllAction } from '../dividend.actions';

@Injectable()
export class DepositProductDividendApiEffects {
  @Effect()
  loadAll$: Observable<Action> = this.actions$.pipe(
    ofType(dividendActions.LOAD_ALL),
    switchMap((action: LoadAllAction) => {
      return this.depositService.fetchDividendDistributions(action.payload).pipe(
        map(dividendDistributions => new dividendActions.LoadAllCompleteAction(dividendDistributions)),
        catchError(() => of(new dividendActions.LoadAllCompleteAction([]))),
      );
    }),
  );

  @Effect()
  createDividendDistribution$: Observable<Action> = this.actions$.pipe(
    ofType(dividendActions.CREATE),
    map((action: dividendActions.CreateDividendDistributionAction) => action.payload),
    mergeMap(payload =>
      this.depositService.distributeDividend(payload.productDefinitionId, payload.dividendDistribution).pipe(
        map(() => new dividendActions.CreateDividendDistributionSuccessAction(payload)),
        catchError(error => of(new dividendActions.CreateDividendDistributionFailAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private depositService: DepositAccountService) {}
}
