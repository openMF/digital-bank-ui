import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import { AUTHORIZATION_HEADER, TENANT_HEADER, USER_HEADER } from '../http/http.service';
import { State } from '../../store/security/authentication.reducer';
import { map, switchMap, catchError, take } from 'rxjs/operators';

@Injectable()
export class ImageService {
  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {}

  public getImage(url: string): Observable<Blob> {
    return this.store.select(fromRoot.getAuthenticationState).pipe(
      take(1),
      map(this.mapHeader),
      switchMap((headers: HttpHeaders) =>
        this.http
          .get(url, {
            responseType: 'blob' as 'json',
            headers: headers,
          })
          .pipe(
            map((response: any) => response.blob()),
            catchError(() => of(new Blob())),
          ),
      ),
    );
  }

  private mapHeader(authenticationState: State): HttpHeaders {
    let headers = new HttpHeaders();

    headers = headers.set('Accept', 'application/json');

    headers = headers.set(TENANT_HEADER, authenticationState.tenant);
    headers = headers.set(USER_HEADER, authenticationState.username);
    headers = headers.set(AUTHORIZATION_HEADER, authenticationState.authentication.accessToken);

    return headers;
  }
}
