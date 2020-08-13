import { Injectable } from '@angular/core';
import { CustomerService } from '../../../../../../services/customer/customer.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as identificationCardScans from '../scans.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap, skip, takeUntil, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class CustomerIdentificationCardScanApiEffects {
  @Effect()
  loadAll$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCardScans.LOAD_ALL),
    debounceTime(300),
    map((action: identificationCardScans.LoadAllAction) => action.payload),
    switchMap(payload => {
      const nextSearch$ = this.actions$.pipe(ofType(identificationCardScans.LOAD_ALL), skip(1));

      return this.customerService.fetchIdentificationCardScans(payload.customerIdentifier, payload.identificationCardNumber).pipe(
        takeUntil(nextSearch$),
        map(scans => new identificationCardScans.LoadAllCompleteAction(scans)),
        catchError(() => of(new identificationCardScans.LoadAllCompleteAction([]))),
      );
    }),
  );

  @Effect()
  createIdentificationCardScan$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCardScans.CREATE),
    map((action: identificationCardScans.CreateIdentityCardScanAction) => action.payload),
    mergeMap(payload =>
      this.customerService
        .uploadIdentificationCardScan(payload.customerIdentifier, payload.identificationCardNumber, payload.scan, payload.file)
        .pipe(
          map(
            () =>
              new identificationCardScans.CreateIdentityCardScanSuccessAction({
                resource: payload.scan,
                activatedRoute: payload.activatedRoute,
              }),
          ),
          catchError(error => of(new identificationCardScans.CreateIdentityCardScanFailAction(error))),
        ),
    ),
  );

  @Effect()
  deleteIdentificationCardScan$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCardScans.DELETE),
    map((action: identificationCardScans.DeleteIdentityCardScanAction) => action.payload),
    mergeMap(payload =>
      this.customerService
        .deleteIdentificationCardScan(payload.customerIdentifier, payload.identificationCardNumber, payload.scan.identifier)
        .pipe(
          map(
            () =>
              new identificationCardScans.DeleteIdentityCardScanSuccessAction({
                resource: payload.scan,
                activatedRoute: undefined,
              }),
          ),
          catchError(error => of(new identificationCardScans.DeleteIdentityCardScanFailAction(error))),
        ),
    ),
  );

  constructor(private actions$: Actions, private customerService: CustomerService) {}
}
