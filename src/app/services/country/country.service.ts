import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Country } from './model/country.model';
import { escapeRegexPattern } from '../../main/common/regex/escape';

@Injectable()
export class CountryService {
  private countries: Country[] = [];

  constructor(private http: HttpClient) {}

  init(): void {
    this.getCountries().subscribe(countries => (this.countries = countries));
  }

  returnCountries(countries: Country[]): Country[] {
    return countries;
  }

  fetchCountries(term): Country[] {
    const regTerm = new RegExp(`^${escapeRegexPattern(term)}`, 'gi');

    let result: Country[];

    if (term) {
      result = this.countries.filter((country: Country) => regTerm.test(country.name));
    } else {
      result = this.countries.slice();
    }
    return result;
  }

  fetchByCountryCode(countryCode: string): Country {
    return this.countries.find((country: Country) => country.alpha2Code === countryCode);
  }

  getCountries(): Observable<any> {
    return this.http.get('https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;translations');
  }
}
