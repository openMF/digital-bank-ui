import { CountryService } from '../../../services/country/country.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export function countryExists(countryService: CountryService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<any> => {
    if (!control.dirty || !control.value || control.value.length === 0) {
      return of(null);
    }

    const country = control.value;
    const name: string = !!(country && typeof country === 'object') ? country.name : country;
    countryService.init();

    return of(name).pipe(
      map(searchTerm => countryService.fetchCountries(name)),
      map(countries => {
        if (countries.length === 1 && countries[0].name === name) {
          return null;
        }
        return {
          invalidCountry: true,
        };
      }),
    );
  };
}
