import { Injectable } from '@angular/core';
import { NotificationService, NotificationType } from '../../../../../../services/notification/notification.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as identificationCardScanActions from '../scans.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class CustomerIdentificationCardScanNotificationEffects {
  @Effect({ dispatch: false })
  createIdentificationCardScanSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCardScanActions.CREATE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Scan is going to be uploaded',
      }),
    ),
  );

  @Effect({ dispatch: false })
  deleteIdentificationCardScanSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(identificationCardScanActions.DELETE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Scan is going to be deleted',
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
