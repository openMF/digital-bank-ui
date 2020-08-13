import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as customerActions from '../customer.actions';
import { CustomerService } from '../../../services/customer/customer.service';
import { emptySearchResult } from '../../../main/common/store/search.reducer';
import { map, switchMap, debounceTime, skip, catchError, takeUntil } from 'rxjs/operators';

@Injectable()
export class CustomerSearchApiEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.SEARCH),
    debounceTime(300),
    map((action: customerActions.SearchAction) => action.payload),
    switchMap(fetchRequest => {
      const nextSearch$ = this.actions$.pipe(ofType(customerActions.SEARCH), skip(1));

      return this.customerService.fetchCustomers(fetchRequest).pipe(
        takeUntil(nextSearch$),
        map(
          customerPage =>
            new customerActions.SearchCompleteAction({
              elements: customerPage.customers,
              totalElements: customerPage.totalElements,
              totalPages: customerPage.totalPages,
            }),
        ),
        catchError(() => of(new customerActions.SearchCompleteAction(emptySearchResult()))),
      );
    }),
  );

  constructor(private actions$: Actions, private customerService: CustomerService) {}
}
