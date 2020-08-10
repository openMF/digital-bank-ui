import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { NotificationService, NotificationType } from '../../../../services/notification/notification.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as definitionActions from '../product.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class DepositProductDefinitionNotificationEffects {
  @Effect({ dispatch: false })
  createProductDefinitionSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(definitionActions.CREATE_SUCCESS, definitionActions.UPDATE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Product is going to be saved',
      }),
    ),
  );

  @Effect({ dispatch: false })
  deleteProductDefinitionSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(definitionActions.DELETE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Product is going to be deleted',
      }),
    ),
  );

  @Effect({ dispatch: false })
  deleteProductDefinitionFail$: Observable<Action> = this.actions$.pipe(
    ofType(definitionActions.DELETE_FAIL),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.ALERT,
        message: 'Product is already assigned to a member.',
      }),
    ),
  );

  @Effect({ dispatch: false })
  executeCommandSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(definitionActions.EXECUTE_COMMAND_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Product is going to be updated',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
