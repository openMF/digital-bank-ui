import { Inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Error } from '../../domain/error.model';

@Injectable()
export class AuthenticationService {
  private static encodePassword(password: string): string {
    return btoa(password);
  }

  constructor(@Inject('identityBaseUrl') private identityBaseUrl: string, private http: HttpClient) {}

  login(tenantId: string, userId: string, password: string): Observable<any> {
    const encodedPassword: string = AuthenticationService.encodePassword(password);
    const loginUrl = this.identityBaseUrl + '/token?grant_type=password&username=' + userId + '&password=' + encodedPassword;
    return this.http.post(loginUrl, {}, this.tenantHeader(tenantId)).pipe(catchError(Error.handleError));
  }

  logout(tenantId: string, userId: string, accessToken: string): Observable<any> {
    return this.http
      .delete(this.identityBaseUrl + '/token/_current', this.authorizationHeader(tenantId, userId, accessToken))
      .pipe(catchError(Error.handleError));
  }

  getUserPermissions(tenantId: string, userId: string, accessToken: string): Observable<any> {
    return this.http
      .get(this.identityBaseUrl + '/users/' + userId + '/permissions', this.authorizationHeader(tenantId, userId, accessToken))
      .pipe(catchError(Error.handleError));
  }

  refreshAccessToken(tenantId: string): Observable<any> {
    const refreshTokenUrl = '/token?grant_type=refresh_token';
    return this.http.post(this.identityBaseUrl + refreshTokenUrl, {}, this.tenantHeader(tenantId)).pipe(catchError(Error.handleError));
  }

  private authorizationHeader(tenantId: string, userId: string, accessToken: string): any {
    const headers: HttpHeaders = new HttpHeaders({
      'X-Tenant-Identifier': tenantId,
      'User': userId,
      'Authorization': accessToken,
    });
    return { headers: headers };
  }

  private tenantHeader(tenantId: string): any {
    const headers: HttpHeaders = new HttpHeaders({
      'X-Tenant-Identifier': tenantId,
    });
    return { headers: headers };
  }
}
