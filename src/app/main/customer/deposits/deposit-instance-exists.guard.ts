import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromDeposits from './store';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { DepositAccountService } from '../../../services/depositAccount/deposit-account.service';
import { ExistsGuardService } from '../../common/guards/exists-guard';
import { LoadAction } from './store/deposit.actions';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class DepositInstanceExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromDeposits.State>,
    private depositService: DepositAccountService,
    private existsGuardService: ExistsGuardService,
  ) {}

  hasProductInstanceInStore(id: string): Observable<boolean> {
    const timestamp$ = this.store.select(fromDeposits.getDepositsLoadedAt).pipe(map(loadedAt => loadedAt[id]));

    return this.existsGuardService.isWithinExpiry(timestamp$);
  }

  hasProductInstanceInApi(id: string): Observable<boolean> {
    const getProductInstance$ = this.depositService.findProductInstance(id).pipe(
      map(
        productInstance =>
          new LoadAction({
            resource: productInstance,
          }),
      ),
      tap((action: LoadAction) => this.store.dispatch(action)),
      map(productInstance => !!productInstance),
    );

    return this.existsGuardService.routeTo404OnError(getProductInstance$);
  }

  hasProductInstance(id: string): Observable<boolean> {
    return this.hasProductInstanceInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasProductInstanceInApi(id);
      }),
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.hasProductInstance(route.params['id']);
  }
}
