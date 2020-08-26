import { NotificationService, NotificationType } from '../../../../../services/notification/notification.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as instanceActions from '../deposit.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class DepositProductInstanceNotificationEffects {
  @Effect({ dispatch: false })
  createProductInstanceSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(instanceActions.CREATE_SUCCESS, instanceActions.UPDATE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Deposit account is going to be saved',
      }),
    ),
  );

  @Effect({ dispatch: false })
  issueChequesSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(instanceActions.ISSUE_CHEQUES_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Cheques are going to be issued',
      }),
    ),
  );

  @Effect({ dispatch: false })
  issueChequesFail$: Observable<Action> = this.actions$.pipe(
    ofType(instanceActions.ISSUE_CHEQUES_FAIL),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.ALERT,
        message: 'There was an issue issuing cheques',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
