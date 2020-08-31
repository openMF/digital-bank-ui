import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap, skip, catchError, takeUntil } from 'rxjs/operators';
import { emptySearchResult } from '../../../../common/store/search.reducer';
import { DepositAccountService } from '../../../../../services/depositAccount/deposit-account.service';
import { Injectable } from '@angular/core';
import * as instanceActions from '../deposit.actions';

@Injectable()
export class DepositProductInstanceApiEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType(instanceActions.SEARCH),
    debounceTime(300),
    map((action: instanceActions.SearchAction) => action.payload),
    switchMap(payload => {
      const nextSearch$ = this.actions$.pipe(ofType(instanceActions.SEARCH), skip(1));

      return this.depositService.fetchProductInstances(payload.customerId).pipe(
        takeUntil(nextSearch$),
        map(
          productInstances =>
            new instanceActions.SearchCompleteAction({
              elements: productInstances,
              totalElements: productInstances.length,
              totalPages: 1,
            }),
        ),
        catchError(() => of(new instanceActions.SearchCompleteAction(emptySearchResult()))),
      );
    }),
  );

  constructor(private actions$: Actions, private depositService: DepositAccountService) {}
}
