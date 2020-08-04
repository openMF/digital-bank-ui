import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, forkJoin } from 'rxjs';
import { Action } from '@ngrx/store';
import * as userActions from '../user.actions';
import { IdentityService } from '../../../../services/identity/identity.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RoleIdentifier } from '../../../../services/identity/domain/role-identifier.model';
import { Password } from '../../../../services/identity/domain/password.model';
import { User } from '../../../../services/identity/domain/user.model';

@Injectable()
export class UserApiEffects {
  @Effect()
  createUser$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.CREATE),
    map((action: userActions.CreateUserAction) => action.payload),
    mergeMap(payload =>
      this.identityService.createUser(payload.user).pipe(
        map(
          () =>
            new userActions.CreateUserSuccessAction({
              resource: { identifier: payload.user.identifier, role: payload.user.role },
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new userActions.CreateUserFailAction(error))),
      ),
    ),
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.UPDATE),
    map((action: userActions.UpdateUserAction) => action.payload),
    mergeMap(payload => {
      const user: User = { identifier: payload.identifier, role: payload.role };
      const httpCalls: Observable<any>[] = [];
      httpCalls.push(this.identityService.changeUserRole(payload.identifier, new RoleIdentifier(payload.role)));
      if (payload.password) {
        httpCalls.push(this.identityService.changePassword(payload.identifier, new Password(payload.password)));
      }

      return forkJoin(httpCalls).pipe(
        map(
          () =>
            new userActions.UpdateUserSuccessAction({
              resource: user,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new userActions.UpdateUserFailAction(error))),
      );
    }),
  );

  constructor(private actions$: Actions, private identityService: IdentityService) {}
}
