import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as taskActions from '../customer-task.actions';
import { NotificationService, NotificationType } from '../../../../../services/notification/notification.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class CustomerTasksNotificationEffects {
  @Effect({ dispatch: false })
  executeCustomerTaskSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.EXECUTE_TASK_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Task is going to be executed',
      }),
    ),
  );

  @Effect({ dispatch: false })
  executeCustomerTaskFail$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.EXECUTE_TASK_FAIL),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.ALERT,
        message: 'Sorry, there was a problem executing your task',
      }),
    ),
  );

  @Effect({ dispatch: false })
  executeCustomerCommandSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.EXECUTE_COMMAND_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Command is going to be executed',
      }),
    ),
  );

  @Effect({ dispatch: false })
  executeCustomerCommandFail$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.EXECUTE_COMMAND_FAIL),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.ALERT,
        message: 'Sorry, there was a problem executing your command',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
