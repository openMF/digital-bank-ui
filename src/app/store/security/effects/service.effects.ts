import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as securityActions from '../security.actions';
import { AuthenticationService } from '../../../services/security/authn/authentication.service';
import { PermissionId } from '../../../services/security/authz/permission-id.type';
import { FimsPermission } from '../../../services/security/authz/fims-permission.model';
import { Permission } from '../../../services/identity/domain/permission.model';
import { PermittableGroupIdMapper } from '../../../services/security/authz/permittable-group-id-mapper';
import * as fromRoot from '../../index';
import { IdentityService } from '../../../services/identity/identity.service';
import { Password } from '../../../services/identity/domain/password.model';
import { from as observableFrom, timer as observableTimer, Observable, of, of as observableOf } from 'rxjs';
import { reduce, map, mergeMap, catchError, take, switchMap } from 'rxjs/operators';

@Injectable()
export class SecurityApiEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.LOGIN),
    map((action: securityActions.LoginAction) => action.payload),
    mergeMap(payload =>
      this.authenticationService.login(payload.tenant, payload.username, payload.password).pipe(
        map(authentication =>
          Object.assign(
            {},
            {
              username: payload.username,
              tenant: payload.tenant,
              authentication: authentication,
            },
          ),
        ),
        map(successPayload => new securityActions.LoginSuccessAction(successPayload)),
        catchError(error => of(new securityActions.LoginFailAction(error))),
      ),
    ),
  );

  @Effect()
  loadPermissions$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.LOGIN_SUCCESS),
    map((action: securityActions.LoginSuccessAction) => action.payload),
    mergeMap(payload =>
      this.fetchPermissions(payload.tenant, payload.username, payload.authentication.accessToken).pipe(
        map(permissions => new securityActions.PermissionUpdateSuccessAction(permissions)),
        catchError(error => of(new securityActions.PermissionUpdateFailAction(error))),
      ),
    ),
  );

  @Effect()
  startRefreshTokenTimer$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.LOGIN_SUCCESS),
    map((action: securityActions.LoginSuccessAction) => action.payload),
    map(payload => new Date(payload.authentication.refreshTokenExpiration).getTime()),
    map(refreshTokenExpirationMillies => new Date(refreshTokenExpirationMillies - this.tokenExpiryBuffer)),
    map(delay => new securityActions.RefreshTokenStartTimerAction(delay)),
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.LOGOUT),
    mergeMap(() => this.store.select(fromRoot.getAuthenticationState).pipe(take(1))),
    mergeMap(state =>
      this.authenticationService.logout(state.tenant, state.username, state.authentication.accessToken).pipe(
        map(() => new securityActions.LogoutSuccessAction()),
        catchError(error => of(new securityActions.LogoutSuccessAction())),
      ),
    ),
  );

  @Effect()
  refreshToken$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.REFRESH_ACCESS_TOKEN),
    mergeMap(() => this.store.select(fromRoot.getAuthenticationState).pipe(take(1))),
    mergeMap(state =>
      this.authenticationService.refreshAccessToken(state.tenant).pipe(
        map(authentication => new securityActions.RefreshAccessTokenSuccessAction(authentication)),
        catchError(error => of(new securityActions.RefreshAccessTokenFailAction(error))),
      ),
    ),
  );

  @Effect()
  startAccessTokenRefreshTimerAfterLogin$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.LOGIN_SUCCESS),
    map((action: securityActions.LoginSuccessAction) => action.payload),
    map(payload => new Date(payload.authentication.accessTokenExpiration).getTime()),
    map(accessTokenExpirationMillies => new Date(accessTokenExpirationMillies - this.tokenExpiryBuffer)),
    map(dueTime => new securityActions.RefreshAccessTokenStartTimerAction(dueTime)),
  );

  @Effect()
  startAccessTokenRefreshTimerAfterRefresh$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.REFRESH_ACCESS_TOKEN_SUCCESS),
    map((action: securityActions.RefreshAccessTokenSuccessAction) => action.payload),
    map(payload => new Date(payload.accessTokenExpiration).getTime()),
    map(accessTokenExpirationMillies => new Date(accessTokenExpirationMillies - this.tokenExpiryBuffer)),
    map(dueTime => new securityActions.RefreshAccessTokenStartTimerAction(dueTime)),
  );

  @Effect()
  refreshAccessTokenStartTimer$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.REFRESH_ACCESS_TOKEN_START_TIMER),
    map((action: securityActions.RefreshAccessTokenStartTimerAction) => action.payload),
    mergeMap(dueTime => observableTimer(dueTime).pipe(switchMap(() => of(new securityActions.RefreshAccessTokenAction())))),
  );

  @Effect()
  refreshTokenStartTimer$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.REFRESH_TOKEN_START_TIMER),
    map((action: securityActions.RefreshTokenStartTimerAction) => action.payload),
    mergeMap(dueTime => observableTimer(dueTime).pipe(switchMap(() => of(new securityActions.LogoutAction())))),
  );

  @Effect()
  changePassword$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.CHANGE_PASSWORD),
    map((action: securityActions.ChangePasswordAction) => action.payload),
    mergeMap(payload =>
      this.identityService.changePassword(payload.username, new Password(payload.password)).pipe(
        map(() => new securityActions.ChangePasswordSuccessAction()),
        catchError(error => of(new securityActions.ChangePasswordFailAction(error))),
      ),
    ),
  );

  @Effect()
  logoutOnPasswordChange$: Observable<Action> = this.actions$.pipe(
    ofType(securityActions.CHANGE_PASSWORD_SUCCESS),
    mergeMap(() => observableOf(new securityActions.LogoutAction())),
  );

  private fetchPermissions(tenantId: string, username: string, accessToken: string): Observable<FimsPermission[]> {
    return this.authenticationService.getUserPermissions(tenantId, username, accessToken).pipe(
      mergeMap((permissions: Permission[]) => observableFrom(permissions)),
      map((permission: Permission) => this.mapPermissions(permission)),
      reduce((acc: FimsPermission[], permissions: FimsPermission[]) => acc.concat(permissions), []),
    );
  }

  private mapPermissions(permission: Permission): FimsPermission[] {
    const result: FimsPermission[] = [];
    const descriptor = this.idMapper.map(permission.permittableEndpointGroupIdentifier);

    if (descriptor) {
      const internalKey: PermissionId = descriptor.id;

      for (const operation of permission.allowedOperations) {
        result.push({
          id: internalKey,
          accessLevel: operation,
        });
      }
    }

    return result;
  }

  constructor(
    private actions$: Actions,
    private identityService: IdentityService,
    private authenticationService: AuthenticationService,
    private idMapper: PermittableGroupIdMapper,
    @Inject('tokenExpiryBuffer') private tokenExpiryBuffer: number,
    private store: Store<fromRoot.State>,
  ) {}
}
