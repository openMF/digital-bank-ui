import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromCustomers from './store';
import { Observable, of } from 'rxjs';
import { LoadAction } from './store/customer.actions';
import { CustomerService } from '../../services/customer/customer.service';
import { Store } from '@ngrx/store';
import { ExistsGuardService } from '../common/guards/exists-guard';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class CustomerExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromCustomers.State>,
    private customerService: CustomerService,
    private existsGuardService: ExistsGuardService,
  ) {}

  hasCustomerInStore(id: string): Observable<boolean> {
    const timestamp$: Observable<number> = this.store.select(fromCustomers.getCustomerLoadedAt).pipe(map(loadedAt => loadedAt[id]));

    return this.existsGuardService.isWithinExpiry(timestamp$);
  }

  hasCustomerInApi(id: string): Observable<boolean> {
    const getCustomer$: Observable<any> = this.customerService.getCustomer(id).pipe(
      map(
        customerEntity =>
          new LoadAction({
            resource: customerEntity,
          }),
      ),
      tap((action: LoadAction) => this.store.dispatch(action)),
      map(customer => !!customer),
    );

    return this.existsGuardService.routeTo404OnError(getCustomer$);
  }

  hasCustomer(id: string): Observable<boolean> {
    return this.hasCustomerInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasCustomerInApi(id);
      }),
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.hasCustomer(route.params['id']);
  }
}
