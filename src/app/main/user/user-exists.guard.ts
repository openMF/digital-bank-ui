import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromUsers from './store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IdentityService } from '../../services/identity/identity.service';
import { LoadAction } from './store/user.actions';
import { ExistsGuardService } from '../common/guards/exists-guard';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromUsers.State>,
    private identityService: IdentityService,
    private existsGuardService: ExistsGuardService,
  ) {}

  hasUserInStore(id: string): Observable<boolean> {
    const timestamp$ = this.store.select(fromUsers.getUsersLoadedAt).pipe(map(loadedAt => loadedAt[id]));

    return this.existsGuardService.isWithinExpiry(timestamp$);
  }

  hasUserInApi(id: string): Observable<boolean> {
    const getUser$ = this.identityService.getUser(id).pipe(
      map(
        userEntity =>
          new LoadAction({
            resource: userEntity,
          }),
      ),
      tap((action: LoadAction) => this.store.dispatch(action)),
      map(user => !!user),
    );

    return this.existsGuardService.routeTo404OnError(getUser$);
  }

  hasUser(id: string): Observable<boolean> {
    return this.hasUserInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasUserInApi(id);
      }),
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.hasUser(route.params['id']);
  }
}
