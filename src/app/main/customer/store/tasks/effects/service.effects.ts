import { Injectable } from '@angular/core';
import { CustomerService } from '../../../../../services/customer/customer.service';
import * as taskActions from '../task.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap, skip, takeUntil, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class TasksApiEffects {
  @Effect()
  loadAll$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.LOAD_ALL),
    debounceTime(300),
    map((action: taskActions.LoadAllAction) => action.payload),
    switchMap(() => {
      const nextSearch$ = this.actions$.pipe(ofType(taskActions.LOAD_ALL), skip(1));

      return this.customerService.fetchTasks().pipe(
        takeUntil(nextSearch$),
        map(taskPage => new taskActions.LoadAllCompleteAction(taskPage)),
        catchError(() => of(new taskActions.LoadAllCompleteAction([]))),
      );
    }),
  );

  @Effect()
  createTask$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.CREATE),
    map((action: taskActions.CreateTaskAction) => action.payload),
    mergeMap(payload =>
      this.customerService.createTask(payload.task).pipe(
        map(
          () =>
            new taskActions.CreateTaskSuccessAction({
              resource: payload.task,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new taskActions.CreateTaskFailAction(error))),
      ),
    ),
  );

  @Effect()
  updateTask$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.UPDATE),
    map((action: taskActions.CreateTaskAction) => action.payload),
    mergeMap(payload =>
      this.customerService.updateTask(payload.task).pipe(
        map(
          () =>
            new taskActions.UpdateTaskSuccessAction({
              resource: payload.task,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new taskActions.UpdateTaskFailAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private customerService: CustomerService) {}
}
