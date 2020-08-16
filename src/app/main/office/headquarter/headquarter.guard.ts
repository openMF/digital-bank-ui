import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OfficeService } from '../../../services/office/office.service';
import { OfficePage } from '../../../services/office/domain/office-page.model';
import { Office } from '../../../services/office/domain/office.model';
import { map } from 'rxjs/operators';

@Injectable()
export class HeadquarterGuard implements CanActivate {
  constructor(private officeService: OfficeService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const searchTerm = route.queryParams['term'];

    if (searchTerm) {
      return of(true);
    }

    return this.officeService.listOffices().pipe(
      map((officePage: OfficePage) => {
        if (officePage.totalElements) {
          const firstOffice: Office = officePage.offices[0];
          this.router.navigate(['offices/detail', firstOffice.identifier]);
        } else {
          this.router.navigate(['offices/hqNotFound']);
        }

        return false;
      }),
    );
  }
}
