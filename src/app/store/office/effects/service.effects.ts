import { Injectable } from '@angular/core';
import { OfficeService } from '../../../services/office/office.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as officeActions from '../office.actions';
import { emptySearchResult } from '../../../main/common/store/search.reducer';
import { debounceTime, map, switchMap, catchError, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class OfficeSearchApiEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType(officeActions.SEARCH),
    debounceTime(300),
    map((action: officeActions.SearchAction) => action.payload),
    switchMap(fetchRequest => {
      const nextSearch$ = this.actions$.pipe(ofType(officeActions.SEARCH), skip(1));

      return this.officeService.listOffices(fetchRequest).pipe(
        takeUntil(nextSearch$),
        map(
          officePage =>
            new officeActions.SearchCompleteAction({
              elements: officePage.offices,
              totalElements: officePage.totalElements,
              totalPages: officePage.totalPages,
            }),
        ),
        catchError(() => of(new officeActions.SearchCompleteAction(emptySearchResult()))),
      );
    }),
  );

  constructor(private actions$: Actions, private officeService: OfficeService) {}
}
