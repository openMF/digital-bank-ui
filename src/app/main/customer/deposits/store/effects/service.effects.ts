import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { DepositAccountService } from '../../../../../services/depositAccount/deposit-account.service';
import { Injectable } from '@angular/core';
import * as instanceActions from '../deposit.actions';
import { ChequeService } from '../../../../../services/cheque/cheque.service';

@Injectable()
export class DepositProductInstanceApiEffects {
  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(instanceActions.CREATE),
    map((action: instanceActions.CreateProductInstanceAction) => action.payload),
    mergeMap(payload =>
      this.depositService.createProductInstance(payload.productInstance).pipe(
        map(
          () =>
            new instanceActions.CreateProductInstanceSuccessAction({
              resource: payload.productInstance,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new instanceActions.CreateProductInstanceFailAction(error))),
      ),
    ),
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(instanceActions.UPDATE),
    map((action: instanceActions.UpdateProductInstanceAction) => action.payload),
    mergeMap(payload =>
      this.depositService.updateProductInstance(payload.productInstance).pipe(
        map(
          () =>
            new instanceActions.UpdateProductInstanceSuccessAction({
              resource: payload.productInstance,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new instanceActions.UpdateProductInstanceFailAction(error))),
      ),
    ),
  );

  @Effect()
  issueCheques$: Observable<Action> = this.actions$.pipe(
    ofType(instanceActions.ISSUE_CHEQUES),
    map((action: instanceActions.IssueChequesAction) => action.payload),
    mergeMap(payload =>
      this.chequeService.issue(payload.issuingCount).pipe(
        map(() => new instanceActions.IssueChequesSuccessAction(payload)),
        catchError(error => of(new instanceActions.IssueChequesFailAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private depositService: DepositAccountService, private chequeService: ChequeService) {}
}
