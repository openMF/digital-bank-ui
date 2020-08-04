import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as roleActions from '../role.actions';
import { IdentityService } from '../../../services/identity/identity.service';
import { emptySearchResult } from '../../../main/common/store/search.reducer';
import { Role } from '../../../services/identity/domain/role.model';
import { catchError, map, takeUntil, skip, switchMap, debounceTime } from 'rxjs/operators';

const SYSTEM_ROLES: string[] = ['pharaoh', 'scheduler'];

@Injectable()
export class RoleSearchApiEffects {
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
