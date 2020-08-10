import { Observable, of } from 'rxjs';
import { LoadAction } from './store/product.actions';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromProducts from './store/index';
import { Store } from '@ngrx/store';
import { DepositAccountService } from '../../services/depositAccount/deposit-account.service';
import { ExistsGuardService } from '../common/guards/exists-guard';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class ProductDefinitionExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromProducts.State>,
    private accountService: DepositAccountService,
    private existsGuardService: ExistsGuardService,
  ) {}

  hasProductInStore(id: string): Observable<boolean> {
    const timestamp$ = this.store.select(fromProducts.getProductsLoadedAt).pipe(map(loadedAt => loadedAt[id]));

    return this.existsGuardService.isWithinExpiry(timestamp$);
  }

  hasProductInApi(id: string): Observable<boolean> {
    const getProduct = this.accountService.findProductDefinition(id).pipe(
      map(
        productEntity =>
          new LoadAction({
            resource: productEntity,
          }),
      ),
      tap((action: LoadAction) => this.store.dispatch(action)),

      map(product => !!product),
    );

    return this.existsGuardService.routeTo404OnError(getProduct);
  }

  hasProduct(id: string): Observable<boolean> {
    return this.hasProductInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasProductInApi(id);
      }),
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.hasProduct(route.params['id']);
  }
}
