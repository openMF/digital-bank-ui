import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as denominationActions from '../denomination.actions';
import { TellerService } from '../../../../../../services/teller/teller-service';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class TellerDenominationApiEffects {
  @Effect()
  loadDenomination$: Observable<Action> = this.actions$.pipe(
    ofType(denominationActions.LOAD_DENOMINATION),
    map((action: denominationActions.LoadDenominationAction) => action.payload),
    mergeMap(payload =>
      this.tellerService.fetchTellerDenominations(payload.officeId, payload.tellerCode).pipe(
        map(teller => new denominationActions.LoadDenominationSuccessAction(teller)),
        catchError(error => of(new denominationActions.LoadDenominationSuccessAction([]))),
      ),
    ),
  );

  @Effect()
  createDenomination$: Observable<Action> = this.actions$.pipe(
    ofType(denominationActions.CREATE_DENOMINATION),
    map((action: denominationActions.CreateDenominationAction) => action.payload),
    mergeMap(payload =>
      this.tellerService.saveTellerDenomination(payload.officeId, payload.tellerCode, payload.denomination).pipe(
        map(() => new denominationActions.CreateDenominationSuccessAction(payload)),
        catchError(error => of(new denominationActions.CreateDenominationFailAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private tellerService: TellerService) {}
}
