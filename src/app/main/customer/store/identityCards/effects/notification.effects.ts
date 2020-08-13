import { NotificationService, NotificationType } from '../../../../../services/notification/notification.service';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as identificationCardActions from '../identity-cards.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class CustomerIdentificationCardNotificationEffects {
  @Effect({ dispatch: false })
  createIdentificationCardSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCardActions.CREATE_SUCCESS, identificationCardActions.UPDATE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Identification card is going to be saved',
      }),
    ),
  );

  @Effect({ dispatch: false })
  deleteIdentificationCardSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCardActions.DELETE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Identification card is going to be deleted',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
