import { Injectable } from '@angular/core';
import { NotificationService, NotificationType } from '../../../../../services/notification/notification.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as payrollActions from '../payroll.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class CustomerPayrollNotificationEffects {
  @Effect({ dispatch: false })
  updatePayrollSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(payrollActions.UPDATE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Payroll is going to be saved',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
