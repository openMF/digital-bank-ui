import { Injectable } from '@angular/core';
// import { toPayload } from '@ngrx/effects';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import * as commandActions from '../commands.actions';
import { CustomerService } from '../../../../../services/customer/customer.service';
import { map, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class CustomerCommandApiEffects {
  @Effect()
  loadCommands$: Observable<Action> = this.actions$.pipe(
    ofType(commandActions.LOAD_ALL),
    // map(toPayload),
    mergeMap((customerId: string) =>
      this.customerService.listCustomerCommand(customerId).pipe(
        map(commands => new commandActions.LoadAllCompleteAction(commands)),
        catchError(error => of(new commandActions.LoadAllCompleteAction([]))),
      ),
    ),
  );

  constructor(private actions$: Actions, private customerService: CustomerService) {}
}
