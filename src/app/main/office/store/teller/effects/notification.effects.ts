import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap, filter } from 'rxjs/operators';
import { NotificationService, NotificationType } from '../../../../../services/notification/notification.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as tellerActions from '../teller.actions';

@Injectable()
export class TellerNotificationEffects {
  @Effect({ dispatch: false })
  createTellerSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(tellerActions.CREATE_TELLER_SUCCESS, tellerActions.UPDATE_TELLER_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Teller is going to be saved',
      }),
    ),
  );

  @Effect({ dispatch: false })
  executeCommandSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(tellerActions.EXECUTE_COMMAND_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Teller is going to be updated',
      }),
    ),
  );

  @Effect({ dispatch: false })
  openCommandFail$: Observable<any> = this.actions$.pipe(
    ofType(tellerActions.EXECUTE_COMMAND_FAIL),
    map((action: tellerActions.ExecuteCommandFailAction) => action.payload.command),
    filter(command => command.action === 'OPEN'),
    tap(action =>
      this.notificationService.send({
        type: NotificationType.ALERT,
        title: 'Employee already assigned',
        message: 'Employees can only be assigned to one teller. Please choose a different employee or unassign the employee first.',
      }),
    ),
  );

  @Effect({ dispatch: false })
  closeCommandFail$: Observable<any> = this.actions$.pipe(
    ofType(tellerActions.EXECUTE_COMMAND_FAIL),
    map((action: tellerActions.ExecuteCommandFailAction) => action.payload.command),
    filter(command => command.action === 'CLOSE'),
    tap(action =>
      this.notificationService.send({
        type: NotificationType.ALERT,
        title: 'Denomination required',
        message: 'This teller requires a denomination before it can be closed.',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
