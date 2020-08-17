import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromCustomers from '../store';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { CustomerService } from '../../../services/customer/customer.service';
import { ExistsGuardService } from '../../common/guards/exists-guard';
import { LoadAction } from '../store/tasks/task.actions';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class TaskExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromCustomers.State>,
    private customerService: CustomerService,
    private existsGuardService: ExistsGuardService,
  ) {}

  hasTaskInStore(id: string): Observable<boolean> {
    const timestamp$: Observable<number> = this.store.select(fromCustomers.getTaskLoadedAt).pipe(map(loadedAt => loadedAt[id]));

    return this.existsGuardService.isWithinExpiry(timestamp$);
  }

  hasTaskInApi(id: string): Observable<boolean> {
    const getTask$: Observable<any> = this.customerService.getTask(id).pipe(
      map(
        taskEntity =>
          new LoadAction({
            resource: taskEntity,
          }),
      ),
      tap((action: LoadAction) => this.store.dispatch(action)),
      map(task => !!task),
    );

    return this.existsGuardService.routeTo404OnError(getTask$);
  }

  hasTask(id: string): Observable<boolean> {
    return this.hasTaskInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasTaskInApi(id);
      }),
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.hasTask(route.params['id']);
  }
}
