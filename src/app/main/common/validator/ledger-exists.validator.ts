import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AccountingService } from '../../../services/accounting/accounting.service';
import { isString } from './validators';
import { map, catchError } from 'rxjs/operators';

const invalid = of({
  invalidLedger: true,
});

export function ledgerExists(accountingService: AccountingService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.dirty || !control.value || control.value.length === 0) {
      return of(null);
    }

    if (isString(control.value) && control.value.trim().length === 0) {
      return invalid;
    }

    return accountingService.findLedger(control.value, true).pipe(
      map(ledger => null),
      catchError(() => invalid),
    );
  };
}
