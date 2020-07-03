import { throwError as observableThrowError, Observable, Subject } from 'rxjs';
import { finalize, catchError, mergeMap, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import { LOGOUT } from '../../store/security/security.actions';

export enum Action {
  QueryStart,
  QueryStop,
}

export const TENANT_HEADER = 'X-Tenant-Identifier';
export const USER_HEADER = 'User';
export const AUTHORIZATION_HEADER = 'Authorization';

@Injectable()
export class HttpClientService {
  process: Subject<Action> = new Subject<Action>();

  error: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {}

  public get(url: string, options?: any, silent?: boolean): Observable<any> {
    return this.createRequest('GET', url, undefined, options, silent);
  }

  public post(url: string, body: any, options?: any, silent?: boolean): Observable<any> {
    return this.createRequest('POST', url, body, options, silent);
  }

  public put(url: string, body: any, options?: any): Observable<any> {
    return this.createRequest('PUT', url, body, options);
  }

  public delete(url: string, options?: any): Observable<any> {
    return this.createRequest('DELETE', url, undefined, options);
  }

  private _buildRequestOptions(
    method: string,
    url: string,
    body: any,
    tenant: string,
    username: string,
    accessToken: string,
    options?: any,
  ): any {
    options = options || {};

    let headers: HttpHeaders = new HttpHeaders({
      'X-Tenant-Identifier': tenant,
      'User': username,
      'Authorization': accessToken,
    });

    if (!(body instanceof FormData)) {
      headers = headers.set('Accept', 'application/json').set('Content-Type', 'application/json');
    }

    const requestOptions: any = {
      method: method,
      url: url,
      body: body,
      headers: headers,
      ...options,
    };

    return requestOptions;
  }

  private createRequest(method: string, url: string, body?: any, options?: any, silent?: boolean): Observable<any> {
    return this.store.select(fromRoot.getAuthenticationState).pipe(
      take(1),
      map(state => this._buildRequestOptions(method, url, body, state.tenant, state.username, state.authentication.accessToken, options)),
      mergeMap(requestOptions => {
        this.process.next(Action.QueryStart);

        const request: Observable<any> = this.http
          .request(new HttpRequest(requestOptions.method, requestOptions.url, requestOptions.body, { headers: requestOptions.headers }))
          .pipe(
            catchError((err: any) => {
              const error = err.json();
              if (silent) {
                return observableThrowError(error);
              }

              switch (error.status) {
                case 409:
                  return observableThrowError(error);
                case 401:
                case 403:
                  this.store.dispatch({ type: LOGOUT });
                  return observableThrowError('User is not authenticated');
                default:
                  console.error('Error', error);
                  this.error.next(error);
                  return observableThrowError(error);
              }
            }),
            finalize(() => this.process.next(Action.QueryStop)),
          );
        return request;
      }),
    );
  }
}
