import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService, NotificationType } from '../../../../../services/notification/notification.service';
import { Action } from '@ngrx/store';
import * as catalogActions from '../catalog.actions';
import { DeleteCatalogFailAction, DeleteFieldFailAction, UpdateFieldFailAction } from '../catalog.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class CatalogNotificationEffects {
  @Effect({ dispatch: false })
  createCatalogSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.CREATE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Catalog is going to be saved',
      }),
    ),
  );

  @Effect({ dispatch: false })
  deleteCatalogSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.DELETE_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Catalog is going to be deleted',
      }),
    ),
  );

  @Effect({ dispatch: false })
  deleteCatalogFail$: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.DELETE_FAIL),
    tap((action: DeleteCatalogFailAction) =>
      this.notificationService.send({
        type: NotificationType.ALERT,
        title: `Catalog can't be deleted`,
        message: action.payload.message,
      }),
    ),
  );

  @Effect({ dispatch: false })
  updateFieldSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.UPDATE_FIELD_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Field is going to be updated',
      }),
    ),
  );

  @Effect({ dispatch: false })
  updateFieldFail$: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.UPDATE_FIELD_FAIL),
    tap((action: UpdateFieldFailAction) =>
      this.notificationService.send({
        type: NotificationType.ALERT,
        title: `Field can't be updated`,
        message: action.payload.message,
      }),
    ),
  );

  @Effect({ dispatch: false })
  deleteFieldSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.DELETE_FIELD_SUCCESS),
    tap(() =>
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Field is going to be deleted',
      }),
    ),
  );

  @Effect({ dispatch: false })
  deleteFieldFail$: Observable<Action> = this.actions$.pipe(
    ofType(catalogActions.DELETE_FIELD_FAIL),
    tap((action: DeleteFieldFailAction) =>
      this.notificationService.send({
        type: NotificationType.ALERT,
        title: `Field can't be deleted`,
        message: action.payload.message,
      }),
    ),
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
