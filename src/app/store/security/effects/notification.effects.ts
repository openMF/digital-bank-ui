import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as securityActions from '../security.actions';
import { LoginSuccessAction } from '../security.actions';
import { NotificationService, NotificationType } from '../../../services/notification/notification.service';

@Injectable()
export class SecurityNotificationEffects {
  @Effect({ dispatch: false })
  loginSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.LOGIN_SUCCESS),
    tap((action: LoginSuccessAction) =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: `You are logged in with user '${action.payload.username}'`,
      }),
    ),
  );

  @Effect({ dispatch: false })
  changePasswordSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.CHANGE_PASSWORD_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Your password has been changed',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
