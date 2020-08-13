import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as customerActions from '../customer.actions';
import { NotificationService, NotificationType } from '../../../../services/notification/notification.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class CustomerNotificationEffects {
  @Effect({ dispatch: false })
  createCustomerSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CREATE_SUCCESS, customerActions.UPDATE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Member is going to be saved',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
