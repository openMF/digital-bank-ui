import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Currency } from './domain/currency.model';

@Injectable()
export class CurrencyService {
  private currencies: Currency[] = [
    { code: 'BZD', name: 'Belize Dollar', sign: '$', digits: 2 },
    { code: 'EUR', name: 'Euro', sign: '€', digits: 2 },
    { code: 'GMD', name: 'Gambian Dalasi', sign: 'D', digits: 2 },
    { code: 'JMD', name: 'Jamaican Dollar', sign: '$', digits: 2 },
    { code: 'MXN', name: 'Mexican Peso', sign: '$', digits: 2 },
    { code: 'USD', name: 'US Dollar', sign: '$', digits: 2 },
    { code: 'TTD', name: 'Trinidad and Tobago Dollar', sign: '$', digits: 2 },
    { code: 'XCD', name: 'East Caribbean Dollar', sign: '$', digits: 2 },
  ];

  fetchCurrencies(): Observable<Currency[]> {
    return of(this.currencies.slice(0));
  }

  getCurrency(code: string): Currency {
    const foundCurrency = this.currencies.find(currency => currency.code === code);
    return Object.assign({}, foundCurrency);
  }
}
