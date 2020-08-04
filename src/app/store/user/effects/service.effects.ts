import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as userActions from '../user.actions';
import { IdentityService } from '../../../services/identity/identity.service';
import { emptySearchResult } from '../../../main/common/store/search.reducer';
import { catchError, map, takeUntil, skip, switchMap, debounceTime } from 'rxjs/operators';
import { User } from '../../../services/identity/domain/user.model';

const SYSTEM_ROLES: string[] = ['pharaoh', 'scheduler'];

@Injectable()
export class UserSearchApiEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.SEARCH),
    debounceTime(300),
    switchMap(() => {
      const nextSearch$ = this.actions$.pipe(ofType(userActions.SEARCH), skip(1));

      return this.identityService.listUsers().pipe(
        takeUntil(nextSearch$),
        map(this.excludeSystemUsers),
        map(
          users =>
            new userActions.SearchCompleteAction({
              elements: users,
              totalPages: 1,
              totalElements: users.length,
            }),
        ),
        catchError(() => of(new userActions.SearchCompleteAction(emptySearchResult()))),
      );
    }),
  );

  private excludeSystemUsers(users: User[]): User[] {
    return users.filter(user => SYSTEM_ROLES.indexOf(user.role) === -1);
  }

  constructor(private actions$: Actions, private identityService: IdentityService) {}
}
