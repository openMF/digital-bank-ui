import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as taskActions from '../customer-task.actions';
import { CustomerService } from '../../../../../services/customer/customer.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap, skip, takeUntil, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class CustomerTasksApiEffects {
  @Effect()
  loadAll$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.LOAD_ALL),
    debounceTime(300),
    map((action: taskActions.LoadAllAction) => action.payload),
    switchMap(id => {
      const nextSearch$ = this.actions$.pipe(ofType(taskActions.LOAD_ALL), skip(1));

      return this.customerService.fetchProcessSteps(id).pipe(
        takeUntil(nextSearch$),
        map(processSteps => new taskActions.LoadAllCompleteAction(processSteps)),
        catchError(() => of(new taskActions.LoadAllCompleteAction([]))),
      );
    }),
  );

  @Effect()
  executeTask: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.EXECUTE_TASK),
    map((action: taskActions.ExecuteTaskAction) => action.payload),
    mergeMap(payload =>
      this.customerService.markTaskAsExecuted(payload.customerId, payload.taskId).pipe(
        map(() => new taskActions.ExecuteTaskSuccessAction(payload)),
        catchError(error => of(new taskActions.ExecuteTaskFailAction(error))),
      ),
    ),
  );

  @Effect()
  executeCommand: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.EXECUTE_COMMAND),
    map((action: taskActions.ExecuteCommandAction) => action.payload),
    mergeMap(payload =>
      this.customerService.executeCustomerCommand(payload.customerId, payload.command).pipe(
        map(() => new taskActions.ExecuteCommandSuccessAction(payload)),
        catchError(error => of(new taskActions.ExecuteCommandFailAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private customerService: CustomerService) {}
}
