import { of as observableOf, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import * as fromRoot from '../../store';
import { Store } from '@ngrx/store';

@Injectable()
export class ChangePasswordGuard implements CanActivateChild {
  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isPasswordChangeNeeded().pipe(
      switchMap(passwordChangeNeeded => {
        if (passwordChangeNeeded) {
          this.router.navigate(['/changePassword'], { queryParams: { forced: true } });
          return observableOf(false);
        }

        return observableOf(true);
      }),
    );
  }

  private isPasswordChangeNeeded(): Observable<boolean> {
    return this.store.select(fromRoot.getAuthenticationState).pipe(
      map(state => (state.authentication.passwordExpiration ? new Date(state.authentication.passwordExpiration) : undefined)),
      map(expiryDate => (expiryDate ? expiryDate.getTime() < new Date().getTime() : false)),
    );
  }
}
