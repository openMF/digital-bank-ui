import { Injectable } from '@angular/core';
import { OfficeService } from '../../../../services/office/office.service';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as officeActions from '../office.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class OfficeApiEffects {
  @Effect()
  createOffice$: Observable<Action> = this.actions$.pipe(
    ofType(officeActions.CREATE),
    map((action: officeActions.CreateOfficeAction) => action.payload),
    mergeMap((payload: officeActions.OfficeRoutePayload) =>
      this.officeService.createOffice(payload.office).pipe(
        map(
          () =>
            new officeActions.CreateOfficeSuccessAction({
              resource: payload.office,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new officeActions.CreateOfficeFailAction(error))),
      ),
    ),
  );

  @Effect()
  createBranchOffice$: Observable<Action> = this.actions$.pipe(
    ofType(officeActions.CREATE_BRANCH),
    map((action: officeActions.CreateBranchOfficeAction) => action.payload),
    mergeMap((payload: officeActions.OfficeRoutePayload) =>
      this.officeService.addBranch(payload.office.parentIdentifier, payload.office).pipe(
        map(
          () =>
            new officeActions.CreateOfficeSuccessAction({
              resource: payload.office,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new officeActions.CreateOfficeFailAction(error))),
      ),
    ),
  );

  @Effect()
  updateOffice$: Observable<Action> = this.actions$.pipe(
    ofType(officeActions.UPDATE),
    map((action: officeActions.UpdateOfficeAction) => action.payload),
    mergeMap((payload: officeActions.OfficeRoutePayload) =>
      this.officeService.updateOffice(payload.office).pipe(
        map(
          () =>
            new officeActions.UpdateOfficeSuccessAction({
              resource: payload.office,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new officeActions.UpdateOfficeFailAction(error))),
      ),
    ),
  );

  @Effect()
  deleteOffice$: Observable<Action> = this.actions$.pipe(
    ofType(officeActions.DELETE),
    map((action: officeActions.DeleteOfficeAction) => action.payload),
    mergeMap((payload: officeActions.OfficeRoutePayload) =>
      this.officeService.deleteOffice(payload.office.identifier).pipe(
        map(
          () =>
            new officeActions.DeleteOfficeSuccessAction({
              resource: payload.office,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new officeActions.DeleteOfficeFailAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private officeService: OfficeService) {}
}
