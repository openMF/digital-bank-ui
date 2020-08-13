import { NotificationService, NotificationType } from '../../../../../services/notification/notification.service';
import { Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import * as taskActions from '../task.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class TasksNotificationEffects {
  @Effect({ dispatch: false })
  createTaskSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.CREATE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Task is going to be saved',
      }),
    ),
  );

  @Effect({ dispatch: false })
  updateTaskSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.UPDATE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Task is going to be updated',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
