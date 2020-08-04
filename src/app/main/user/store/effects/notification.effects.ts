import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as userActions from '../user.actions';
import { NotificationService, NotificationType } from '../../../../services/notification/notification.service';

@Injectable()
export class UserNotificationEffects {
  @Effect({ dispatch: false })
  createUserSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.CREATE_SUCCESS, userActions.UPDATE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'User is going to be saved',
      }),
    ),
  );

  @Effect({ dispatch: false })
  deleteUserSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.DELETE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'User is going to be deleted',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
