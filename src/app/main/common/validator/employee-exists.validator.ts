import { OfficeService } from '../../../services/office/office.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { isString } from './validators';
import { map, catchError } from 'rxjs/operators';

const invalid = of({
  invalidEmployee: true,
});

export function employeeExists(officeService: OfficeService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<any> => {
    if (!control.dirty || !control.value || control.value.length === 0) {
      return of(null);
    }

    if (isString(control.value) && control.value.trim().length === 0) {
      return invalid;
    }

    return officeService.getEmployee(control.value, true).pipe(
      map(employee => null),
      catchError(() => invalid),
    );
  };
}
