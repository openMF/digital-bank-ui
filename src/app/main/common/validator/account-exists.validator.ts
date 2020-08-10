import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AccountingService } from '../../../services/accounting/accounting.service';
import { isEmptyInputValue, isString } from './validators';
import { map, catchError } from 'rxjs/operators';

const invalid = of({
  invalidAccount: true,
});

export function accountExists(accountingService: AccountingService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<any> => {
    if (!control.dirty || isEmptyInputValue(control.value)) {
      return of(null);
    }

    if (isString(control.value) && control.value.trim().length === 0) {
      return invalid;
    }

    return accountingService.findAccount(control.value, true).pipe(
      map(account => null),
      catchError(() => invalid),
    );
  };
}
