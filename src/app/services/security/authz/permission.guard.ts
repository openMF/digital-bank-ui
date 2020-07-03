import { of as observableOf, Observable } from 'rxjs';
import { take, filter, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { FimsPermission } from './fims-permission.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store';

@Injectable()
export class PermissionGuard implements CanActivateChild {
  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  waitForPermissions(): Observable<boolean> {
    return this.store.select(fromRoot.getPermissionsLoading).pipe(
      filter(loading => !loading),
      take(1),
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const routeData: any = route.data;

    const routePermission: FimsPermission = routeData.hasPermission;

    // No permission set on route at all
    if (!routePermission) {
      return observableOf(true);
    }

    return this.waitForPermissions().pipe(
      switchMap(() =>
        this.hasPermission(routePermission).pipe(
          map(hasPermission => {
            if (hasPermission) {
              return true;
            }
            this.router.navigate(['/denied']);
            return false;
          }),
        ),
      ),
    );
  }

  private hasPermission(routePermission: FimsPermission): Observable<boolean> {
    return this.store.select(fromRoot.getPermissions).pipe(
      map(permissions =>
        permissions.filter(permission => permission.id === routePermission.id && permission.accessLevel === routePermission.accessLevel),
      ),
      map(matches => matches.length > 0),
      take(1),
    );
  }
}
