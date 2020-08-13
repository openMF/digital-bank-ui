import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as customerActions from '../customer.actions';
import { CustomerService } from '../../../../services/customer/customer.service';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class CustomerApiEffects {
  @Effect()
  createCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CREATE),
    map((action: customerActions.CreateCustomerAction) => action.payload),
    mergeMap(payload =>
      this.customerService.createCustomer(payload.customer).pipe(
        map(
          () =>
            new customerActions.CreateCustomerSuccessAction({
              resource: payload.customer,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new customerActions.CreateCustomerFailAction(error))),
      ),
    ),
  );

  @Effect()
  updateCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.UPDATE),
    map((action: customerActions.UpdateCustomerAction) => action.payload),
    mergeMap(payload =>
      this.customerService.updateCustomer(payload.customer).pipe(
        map(
          () =>
            new customerActions.UpdateCustomerSuccessAction({
              resource: payload.customer,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new customerActions.UpdateCustomerFailAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private customerService: CustomerService) {}
}
