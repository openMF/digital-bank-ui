import { NotificationService, NotificationType } from '../../../../../services/notification/notification.service';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as dividendActions from '../dividend.actions';

@Injectable()
export class DepositProductDividendNotificationEffects {
  @Effect({ dispatch: false })
  createDividendDistributionSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(dividendActions.CREATE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Dividend is going to be distributed',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
