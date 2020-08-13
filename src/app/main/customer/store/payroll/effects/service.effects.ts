import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as payrollActions from '../payroll.actions';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { PayrollService } from '../../../../../services/payroll/payroll.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class CustomerPayrollApiEffects {
  @Effect()
  updatePayroll$: Observable<Action> = this.actions$.pipe(
    ofType(payrollActions.UPDATE),
    map((action: payrollActions.UpdatePayrollDistributionAction) => action.payload),
    mergeMap(payload =>
      this.payrollService.setPayrollConfiguration(payload.customerId, payload.distribution).pipe(
        map(() => new payrollActions.UpdatePayrollDistributionSuccessAction(payload)),
        catchError(error => of(new payrollActions.UpdatePayrollDistributionFailAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private payrollService: PayrollService) {}
}
