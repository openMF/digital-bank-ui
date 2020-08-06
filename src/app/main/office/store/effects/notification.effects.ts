import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as officeActions from '../office.actions';
import { NotificationService, NotificationType } from '../../../../services/notification/notification.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class OfficeNotificationEffects {
  @Effect({ dispatch: false })
  createOfficeSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(officeActions.CREATE_SUCCESS, officeActions.UPDATE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Office is going to be saved',
      }),
    ),
  );

  @Effect({ dispatch: false })
  deleteOfficeSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(officeActions.DELETE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Office is going to be deleted',
      }),
    ),
  );

  @Effect({ dispatch: false })
  deleteOfficeFail$: Observable<Action> = this.actions$.pipe(
    ofType(officeActions.DELETE_FAIL),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.ALERT,
        title: `Office can't be deleted`,
        message: 'Office has either branch offices, employees or teller assigned to it.',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
