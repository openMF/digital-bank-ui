import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromRoles from './store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IdentityService } from '../../services/identity/identity.service';
import { LoadAction } from './store/role.actions';
import { ExistsGuardService } from '../common/guards/exists-guard';

@Injectable()
export class RoleExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromRoles.State>,
    private identityService: IdentityService,
    private existsGuardService: ExistsGuardService,
  ) {}

  hasRoleInStore(id: string): Observable<boolean> {
    const timestamp$ = this.store.select(fromRoles.getRolesLoadedAt).pipe(map(loadedAt => loadedAt[id]));

    return this.existsGuardService.isWithinExpiry(timestamp$);
  }

  hasRoleInApi(id: string): Observable<boolean> {
    const getRole$ = this.identityService.getRole(id).pipe(
      map(
        roleEntity =>
          new LoadAction({
            resource: roleEntity,
          }),
      ),
      tap((action: LoadAction) => this.store.dispatch(action)),
      map(office => !!office),
    );

    return this.existsGuardService.routeTo404OnError(getRole$);
  }

  hasRole(id: string): Observable<boolean> {
    return this.hasRoleInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasRoleInApi(id);
      }),
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.hasRole(route.params['id']);
  }
}
