import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as roleActions from '../role.actions';
import { IdentityService } from '../../../../services/identity/identity.service';
import { catchError, map, takeUntil, skip, switchMap, debounceTime, mergeMap } from 'rxjs/operators';
import { emptySearchResult } from '../../../common/store/search.reducer';
import { Role } from '../../../../services/identity/domain/role.model';

const SYSTEM_ROLES: string[] = ['pharaoh', 'scheduler'];

@Injectable()
export class RoleApiEffects {
  @Effect()
  createRole$: Observable<Action> = this.actions$.pipe(
    ofType(roleActions.CREATE),
    map((action: roleActions.CreateRoleAction) => action.payload),
    mergeMap(payload =>
      this.identityService.createRole(payload.role).pipe(
        map(
          () =>
            new roleActions.CreateRoleSuccessAction({
              resource: payload.role,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new roleActions.CreateRoleFailAction(error))),
      ),
    ),
  );

  @Effect()
  updateRole$: Observable<Action> = this.actions$.pipe(
    ofType(roleActions.UPDATE),
    map((action: roleActions.UpdateRoleAction) => action.payload),
    mergeMap(payload =>
      this.identityService.changeRole(payload.role).pipe(
        map(
          () =>
            new roleActions.UpdateRoleSuccessAction({
              resource: payload.role,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new roleActions.UpdateRoleFailAction(error))),
      ),
    ),
  );

  @Effect()
  deleteRole$: Observable<Action> = this.actions$.pipe(
    ofType(roleActions.DELETE),
    map((action: roleActions.DeleteRoleAction) => action.payload),
    mergeMap(payload =>
      this.identityService.deleteRole(payload.role.identifier).pipe(
        map(
          () =>
            new roleActions.DeleteRoleSuccessAction({
              resource: payload.role,
              activatedRoute: payload.activatedRoute,
            }),
        ),
        catchError(error => of(new roleActions.DeleteRoleFailAction(error))),
      ),
    ),
  );

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType(roleActions.SEARCH),
    debounceTime(300),
    switchMap(() => {
      const nextSearch$ = this.actions$.pipe(ofType(roleActions.SEARCH), skip(1));

      return this.identityService.listRoles().pipe(
        takeUntil(nextSearch$),
        map(this.excludeSystemRoles),
        map(
          roles =>
            new roleActions.SearchCompleteAction({
              elements: roles,
              totalPages: 1,
              totalElements: roles.length,
            }),
        ),
        catchError(() => of(new roleActions.SearchCompleteAction(emptySearchResult()))),
      );
    }),
  );

  private excludeSystemRoles(roles: Role[]): Role[] {
    return roles.filter(role => SYSTEM_ROLES.indexOf(role.identifier) === -1);
  }

  constructor(private actions$: Actions, private identityService: IdentityService) {}
}
