import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as denominationActions from '../denomination.actions';
import { NotificationService, NotificationType } from '../../../../../../services/notification/notification.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class TellerDenominationNotificationEffects {
  @Effect({ dispatch: false })
  createDenominationSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(denominationActions.CREATE_DENOMINATION_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Denomination is going to be saved',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
