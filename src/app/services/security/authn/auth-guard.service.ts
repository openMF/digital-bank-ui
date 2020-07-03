import { map, switchMap, take, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../store';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  waitForAuthentication(): Observable<boolean> {
    return this.store.select(fromRoot.getAuthenticationLoading).pipe(
      filter(loading => !loading),
      take(1),
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.waitForAuthentication().pipe(
      switchMap(() =>
        this.store.select(fromRoot.getAuthentication).pipe(
          map(authentication => {
            if (!authentication) {
              this.router.navigate(['/login']);
              return false;
            }
            return true;
          }),
        ),
      ),
    );
  }
}
