import { TellerService } from '../../../../../services/teller/teller-service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as tellerActions from '../../teller/teller.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class TellerApiEffects {
  @Effect()
  loadTeller$: Observable<Action> = this.actions$.pipe(
    ofType(tellerActions.LOAD_TELLER),
    map((action: tellerActions.LoadTellerAction) => action.payload),
    mergeMap(officeId =>
      this.tellerService.fetch(officeId).pipe(
        map(teller => new tellerActions.LoadTellerSuccessAction(teller)),
        catchError(error => of(new tellerActions.LoadTellerSuccessAction([]))),
      ),
    ),
  );

  @Effect()
  createTeller$: Observable<Action> = this.actions$.pipe(
    ofType(tellerActions.CREATE_TELLER),
    map((action: tellerActions.CreateTellerAction) => action.payload),
    mergeMap(payload =>
      this.tellerService.create(payload.officeId, payload.teller).pipe(
        map(
          () =>
            new tellerActions.CreateTellerSuccessAction({
              activatedRoute: payload.activatedRoute,
              resource: payload.teller,
            }),
        ),
        catchError(error => of(new tellerActions.CreateTellerFailAction(error))),
      ),
    ),
  );

  @Effect()
  updateTeller$: Observable<Action> = this.actions$.pipe(
    ofType(tellerActions.UPDATE_TELLER),
    map((action: tellerActions.UpdateTellerAction) => action.payload),
    mergeMap(payload =>
      this.tellerService.change(payload.officeId, payload.teller).pipe(
        map(
          () =>
            new tellerActions.UpdateTellerSuccessAction({
              activatedRoute: payload.activatedRoute,
              resource: payload.teller,
            }),
        ),
        catchError(error => of(new tellerActions.UpdateTellerFailAction(error))),
      ),
    ),
  );

  @Effect()
  executeCommand$: Observable<Action> = this.actions$.pipe(
    ofType(tellerActions.EXECUTE_COMMAND),
    map((action: tellerActions.ExecuteCommandAction) => action.payload),
    mergeMap(payload =>
      this.tellerService.createCommand(payload.officeId, payload.tellerCode, payload.command).pipe(
        map(() => new tellerActions.ExecuteCommandSuccessAction(payload)),
        catchError(error =>
          of(
            new tellerActions.ExecuteCommandFailAction({
              command: payload.command,
              error,
            }),
          ),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private tellerService: TellerService) {}
}
