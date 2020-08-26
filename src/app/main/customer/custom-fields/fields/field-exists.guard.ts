import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExistsGuardService } from '../../../common/guards/exists-guard';
import { Observable } from 'rxjs/Observable';
import * as fromCustomers from '../../store';
import { map } from 'rxjs/operators';

@Injectable()
export class FieldExistsGuard implements CanActivate {
  constructor(private store: Store<fromCustomers.State>, private existsGuardService: ExistsGuardService) {}

  hasFieldInCatalog(id: string): Observable<boolean> {
    const getField$ = this.store.select(fromCustomers.getCustomerCatalog).pipe(
      map(catalog => catalog.fields.find(field => field.identifier === id)),
      map(field => !!field),
    );

    return this.existsGuardService.routeTo404OnError(getField$);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.hasFieldInCatalog(route.params['fieldId']);
  }
}
