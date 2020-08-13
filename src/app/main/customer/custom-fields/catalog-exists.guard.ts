import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import * as fromCustomers from '../store/index';
import { CatalogService } from '../../../services/catalog/catalog.service';
import { ExistsGuardService } from '../../common/guards/exists-guard';
import { Observable, of } from 'rxjs';
import { LoadAction } from '../store/catalogs/catalog.actions';
import { Store } from '@ngrx/store';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class CatalogExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromCustomers.State>,
    private catalogService: CatalogService,
    private existsGuardService: ExistsGuardService,
  ) {}

  hasCatalogInStore(): Observable<boolean> {
    const timestamp$: Observable<number> = this.store.select(fromCustomers.getCustomerCatalogLoadedAt);

    return this.existsGuardService.isWithinExpiry(timestamp$);
  }

  hasCatalogInApi(id: string): Observable<boolean> {
    return this.catalogService.findCatalog(id, true).pipe(
      catchError(() => {
        return of(null);
      }),
      map(catalogEntity => new LoadAction(catalogEntity)),
      tap((action: LoadAction) => this.store.dispatch(action)),
      map(catalog => !!catalog),
    );
  }

  hasCatalog(id: string): Observable<boolean> {
    return this.hasCatalogInStore().pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasCatalogInApi(id);
      }),
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.hasCatalog('customers');
  }
}
