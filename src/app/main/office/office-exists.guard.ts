import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { OfficeService } from '../../services/office/office.service';
import * as fromOffices from './store';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { LoadAction } from './store/office.actions';
import { ExistsGuardService } from '../common/guards/exists-guard';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class OfficeExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromOffices.State>,
    private officeService: OfficeService,
    private existsGuardService: ExistsGuardService,
  ) {}

  hasOfficeInStore(id: string): Observable<boolean> {
    const timestamp$ = this.store.select(fromOffices.getOfficesLoadedAt).pipe(map(loadedAt => loadedAt[id]));

    return this.existsGuardService.isWithinExpiry(timestamp$);
  }

  hasOfficeInApi(id: string): Observable<boolean> {
    const getOffice$ = this.officeService.getOffice(id).pipe(
      map(
        officeEntity =>
          new LoadAction({
            resource: officeEntity,
          }),
      ),
      tap((action: LoadAction) => this.store.dispatch(action)),
      map(office => !!office),
    );

    return this.existsGuardService.routeTo404OnError(getOffice$);
  }

  hasOffice(id: string): Observable<boolean> {
    return this.hasOfficeInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasOfficeInApi(id);
      }),
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.hasOffice(route.params['id']);
  }
}
