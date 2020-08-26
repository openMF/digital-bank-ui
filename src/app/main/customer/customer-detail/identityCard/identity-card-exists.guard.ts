import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromCustomers from '../../store';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { CustomerService } from '../../../../services/customer/customer.service';
import { ExistsGuardService } from '../../../common/guards/exists-guard';
import { LoadAction } from '../../store/identityCards/identity-cards.actions';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class IdentityCardExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromCustomers.State>,
    private customerService: CustomerService,
    private existsGuardService: ExistsGuardService,
  ) {}

  hasIdentificationCardInStore(number: string): Observable<boolean> {
    const timestamp$: Observable<number> = this.store
      .select(fromCustomers.getIdentificationCardLoadedAt)
      .pipe(map(loadedAt => loadedAt[number]));

    return this.existsGuardService.isWithinExpiry(timestamp$);
  }

  hasIdentificationCardInApi(customerId: string, number: string): Observable<boolean> {
    const getIdentificationCard: Observable<any> = this.customerService.getIdentificationCard(customerId, number).pipe(
      map(
        identificationCardEntity =>
          new LoadAction({
            resource: identificationCardEntity,
          }),
      ),
      tap((action: LoadAction) => this.store.dispatch(action)),
      map(identificationCard => !!identificationCard),
    );

    return this.existsGuardService.routeTo404OnError(getIdentificationCard);
  }

  hasIdentificationCard(customerId: string, number: string): Observable<boolean> {
    return this.hasIdentificationCardInStore(number).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasIdentificationCardInApi(customerId, number);
      }),
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.hasIdentificationCard(route.parent.params['id'], route.params['number']);
  }
}
