import { Inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http/http.service';
import { HttpParams } from '@angular/common/http';
import { Teller } from './domain/teller.model';
import { Observable } from 'rxjs';
import { TellerManagementCommand } from './domain/teller-management-command.model';
import { TellerBalanceSheet } from './domain/teller-balance-sheet.model';
import { TellerAuthentication } from './domain/teller-authentication.model';
import { TellerTransactionCosts } from './domain/teller-transaction-costs.model';
import { TellerTransaction } from './domain/teller-transaction.model';
import { TellerDenomination } from './domain/teller-denomination.model';

@Injectable()
export class TellerService {
  constructor(private http: HttpClientService, @Inject('tellerBaseUrl') private baseUrl: string) {}

  create(officeIdentifier: string, teller: Teller): Observable<void> {
    return this.http.post(`${this.baseUrl}/offices/${officeIdentifier}/teller`, teller);
  }

  find(officeIdentifier: string, tellerCode: string): Observable<Teller> {
    return this.http.get(`${this.baseUrl}/offices/${officeIdentifier}/teller/${tellerCode}`);
  }

  fetch(officeIdentifier: string): Observable<Teller[]> {
    return this.http.get(`${this.baseUrl}/offices/${officeIdentifier}/teller`);
  }

  change(officeIdentifier: string, teller: Teller): Observable<void> {
    return this.http.put(`${this.baseUrl}/offices/${officeIdentifier}/teller/${teller.code}`, teller);
  }

  createCommand(officeIdentifier: string, tellerCode: string, tellerManagementCommand: TellerManagementCommand): Observable<void> {
    return this.http.post(`${this.baseUrl}/offices/${officeIdentifier}/teller/${tellerCode}/commands`, tellerManagementCommand);
  }

  getBalance(officeIdentifier: string, tellerCode: string): Observable<TellerBalanceSheet> {
    return this.http.get(`${this.baseUrl}/offices/${officeIdentifier}/teller/${tellerCode}/balance`);
  }

  unlockDrawer(tellerCode: string, tellerAuthentication: TellerAuthentication): Observable<Teller> {
    return this.http.post(`${this.baseUrl}/teller/${tellerCode}/drawer`, tellerAuthentication, undefined, true);
  }

  executeCommand(tellerCode: string, command: string): Observable<void> {
    let params = new HttpParams();
    params = params.append('command', command);

    return this.http.post(`${this.baseUrl}/teller/${tellerCode}`, {}, { params });
  }

  createTransaction(tellerCode: string, tellerTransaction: TellerTransaction): Observable<TellerTransactionCosts> {
    return this.http.post(`${this.baseUrl}/teller/${tellerCode}/transactions`, tellerTransaction);
  }

  confirmTransaction(
    tellerCode: string,
    tellerTransactionIdentifier: string,
    command: string,
    chargesIncluded?: boolean,
  ): Observable<void> {
    let params = new HttpParams();
    params = params.append('command', command);
    params = params.append('charges', chargesIncluded ? 'included' : 'excluded');

    return this.http.post(`${this.baseUrl}/teller/${tellerCode}/transactions/${tellerTransactionIdentifier}`, {}, { params });
  }

  getTransactions(tellerCode: string): Observable<TellerTransaction[]> {
    return this.http.get(`${this.baseUrl}/teller/${tellerCode}/transactions`);
  }

  saveTellerDenomination(officeIdentifier: string, tellerCode: string, tellerDenomination: TellerDenomination): Observable<void> {
    return this.http.post(`${this.baseUrl}/offices/${officeIdentifier}/teller/${tellerCode}/denominations`, tellerDenomination);
  }

  fetchTellerDenominations(officeIdentifier: string, tellerCode: string): Observable<TellerDenomination[]> {
    return this.http.get(`${this.baseUrl}/offices/${officeIdentifier}/teller/${tellerCode}/denominations`);
  }
}
