import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { CustomerService } from '../../../../../services/customer/customer.service';
import { Injectable } from '@angular/core';
import * as identificationCards from '../identity-cards.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap, skip, takeUntil, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class CustomerIdentificationCardApiEffects {
  @Effect()
  loadAll$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCards.LOAD_ALL),
    debounceTime(300),
    map((action: identificationCards.LoadAllAction) => action.payload),
    switchMap(id => {
      const nextSearch$ = this.actions$.pipe(ofType(identificationCards.LOAD_ALL), skip(1));

      return this.customerService.fetchIdentificationCards(id).pipe(
        takeUntil(nextSearch$),
        map(identifications => new identificationCards.LoadAllCompleteAction(identifications)),
        catchError(() => of(new identificationCards.LoadAllCompleteAction([]))),
      );
    }),
  );

  @Effect()
  createIdentificationCard$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCards.CREATE),
    map((action: identificationCards.CreateIdentityCardAction) => action.payload),
    mergeMap(payload =>
      this.customerService.createIdentificationCard(payload.customerId, payload.identificationCard).pipe(
        map(
          () =>
            new identificationCards.CreateIdentityCardSuccessAction({
              resource: payload.identificationCard,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new identificationCards.CreateIdentityCardFailAction(error))),
      ),
    ),
  );

  @Effect()
  updateIdentificationCard$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCards.UPDATE),
    map((action: identificationCards.UpdateIdentityCardAction) => action.payload),
    mergeMap(payload =>
      this.customerService.updateIdentificationCard(payload.customerId, payload.identificationCard).pipe(
        map(
          () =>
            new identificationCards.UpdateIdentityCardSuccessAction({
              resource: payload.identificationCard,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new identificationCards.UpdateIdentityCardFailAction(error))),
      ),
    ),
  );

  @Effect()
  deleteIdentificationCard$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCards.DELETE),
    map((action: identificationCards.DeleteIdentityCardAction) => action.payload),
    mergeMap(payload =>
      this.customerService.deleteIdentificationCard(payload.customerId, payload.identificationCard.number).pipe(
        map(
          () =>
            new identificationCards.DeleteIdentityCardSuccessAction({
              resource: payload.identificationCard,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new identificationCards.DeleteIdentityCardFailAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private customerService: CustomerService) {}
}
