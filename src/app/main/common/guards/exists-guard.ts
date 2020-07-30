import { catchError, take, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class ExistsGuardService {
  constructor(private router: Router, @Inject('cacheExpiry') private cacheExpiry: number) {}

  isWithinExpiry(observable: Observable<number>): Observable<boolean> {
    return observable.pipe(
      map(loadedAtTimestamp => {
        if (!loadedAtTimestamp) {
          return false;
        }
        return loadedAtTimestamp + this.cacheExpiry > Date.now();
      }),
      take(1),
    );
  }

  routeTo404OnError(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      }),
    );
  }
}
