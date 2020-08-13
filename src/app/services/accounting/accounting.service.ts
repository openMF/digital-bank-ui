import { Inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http/http.service';
import { Ledger } from './domain/ledger.model';
import { Observable } from 'rxjs';
import { Account } from './domain/account.model';
import { HttpParams } from '@angular/common/http';
import { AccountCommand } from './domain/account-command.model';
import { JournalEntry } from './domain/journal-entry.model';
import { TrialBalance } from './domain/trial-balance.model';
import { AccountEntryPage } from './domain/account-entry-page.model';
import { AccountPage } from './domain/account-page.model';
import { FetchRequest } from '../domain/paging/fetch-request.model';
import { buildDateRangeParam, buildSearchParams } from '../domain/paging/search-param.builder';
import { LedgerPage } from './domain/ledger-page.model';
import { ChartOfAccountEntry } from './domain/chart-of-account-entry.model';
import { TransactionType } from './domain/transaction-type.model';
import { TransactionTypePage } from './domain/transaction-type-page.model';
import { AccountType } from './domain/account-type.model';
import { IncomeStatement } from './domain/income-statement.model';
import { FinancialCondition } from './domain/financial-condition.model';
import { share } from 'rxjs/operators';

@Injectable()
export class AccountingService {
  constructor(private http: HttpClientService, @Inject('accountingBaseUrl') private baseUrl: string) {}

  public createLedger(ledger: Ledger): Observable<void> {
    return this.http.post(`${this.baseUrl}/ledgers`, ledger);
  }

  public fetchLedgers(includeSubLedgers = false, fetchRequest?: FetchRequest, type?: AccountType): Observable<LedgerPage> {
    let params: HttpParams = buildSearchParams(fetchRequest);

    params = params.append('includeSubLedgers', String(includeSubLedgers));
    params = params.append('type', type);

    return this.http.get(`${this.baseUrl}/ledgers`, { params });
  }

  public findLedger(identifier: string, silent?: boolean): Observable<Ledger> {
    return this.http.get(`${this.baseUrl}/ledgers/${identifier}`, {}, silent);
  }

  public addSubLedger(identifier: string, subLedger: Ledger): Observable<void> {
    return this.http.post(`${this.baseUrl}/ledgers/${identifier}`, subLedger);
  }

  public modifyLedger(ledger: Ledger): Observable<void> {
    return this.http.put(`${this.baseUrl}/ledgers/${ledger.identifier}`, ledger);
  }

  public deleteLedger(identifier: string): Observable<void> {
    return this.http.delete(`${this.baseUrl}/ledgers/${identifier}`);
  }

  public fetchAccountsOfLedger(identifier: string, fetchRequest?: FetchRequest): Observable<AccountPage> {
    const params: HttpParams = buildSearchParams(fetchRequest);

    return this.http.get(`${this.baseUrl}/ledgers/${identifier}/accounts`, { params: params });
  }

  public createAccount(account: Account): Observable<void> {
    return this.http.post(`${this.baseUrl}/accounts`, account);
  }

  public fetchAccounts(fetchRequest?: FetchRequest, type?: AccountType): Observable<AccountPage> {
    let params: HttpParams = buildSearchParams(fetchRequest);

    params = params.append('type', type);

    return this.http.get(`${this.baseUrl}/accounts`, { params: params }).pipe(share());
  }

  public findAccount(identifier: string, silent?: boolean): Observable<Account> {
    return this.http.get(`${this.baseUrl}/accounts/${identifier}`, {}, silent);
  }

  public modifyAccount(account: Account): Observable<void> {
    return this.http.put(`${this.baseUrl}/accounts/${account.identifier}`, account);
  }

  public deleteAccount(account: Account): Observable<void> {
    return this.http.delete(`${this.baseUrl}/accounts/${account.identifier}`);
  }

  public fetchAccountEntries(
    identifier: string,
    startDate: string,
    endDate: string,
    fetchRequest?: FetchRequest,
  ): Observable<AccountEntryPage> {
    const params: HttpParams = buildSearchParams(fetchRequest);
    const dateRange = buildDateRangeParam(startDate, endDate);
    params.append('dateRange', dateRange);

    return this.http.get(`${this.baseUrl}/accounts/${identifier}/entries`, { params });
  }

  public fetchAccountCommands(identifier: string): Observable<AccountCommand[]> {
    return this.http.get(`${this.baseUrl}/accounts/${identifier}/commands`);
  }

  public accountCommand(identifier: string, command: AccountCommand): Observable<void> {
    return this.http.post(`${this.baseUrl}/accounts/${identifier}/commands`, command);
  }

  public createJournalEntry(journalEntry: JournalEntry): Observable<void> {
    return this.http.post(`${this.baseUrl}/journal`, journalEntry);
  }

  public fetchJournalEntries(startDate: string, endDate: string, account?: string, amount?: string): Observable<JournalEntry[]> {
    const params: HttpParams = new HttpParams();

    params.append('dateRange', buildDateRangeParam(startDate, endDate));
    params.append('account', account && account.length > 0 ? account : undefined);
    params.append('amount', amount && amount.length > 0 ? amount : undefined);

    return this.http.get(`${this.baseUrl}/journal`, { params });
  }

  public findJournalEntry(transactionIdentifier: string): Observable<JournalEntry> {
    return this.http.get(`${this.baseUrl}/journal/${transactionIdentifier}`);
  }

  public getTrialBalance(includeEmptyEntries?: boolean): Observable<TrialBalance> {
    const params: HttpParams = new HttpParams();
    params.append('includeEmptyEntries', includeEmptyEntries ? 'true' : 'false');

    return this.http.get(`${this.baseUrl}/trialbalance`, { params });
  }

  public getChartOfAccounts(): Observable<ChartOfAccountEntry[]> {
    return this.http.get(`${this.baseUrl}/chartofaccounts`);
  }

  public findTransactionType(code: string, silent?: boolean): Observable<Account> {
    return this.http.get(`${this.baseUrl}/transactiontypes/${code}`, {}, silent);
  }

  public createTransactionType(transactionType: TransactionType): Observable<void> {
    return this.http.post(`${this.baseUrl}/transactiontypes`, transactionType);
  }

  public fetchTransactionTypes(fetchRequest?: FetchRequest): Observable<TransactionTypePage> {
    const params: HttpParams = buildSearchParams(fetchRequest);

    return this.http.get(`${this.baseUrl}/transactiontypes`, { params });
  }

  public changeTransactionType(transactionType: TransactionType): Observable<void> {
    return this.http.put(`${this.baseUrl}/transactiontypes/${transactionType.code}`, transactionType);
  }

  public getIncomeStatement(): Observable<IncomeStatement> {
    return this.http.get(`${this.baseUrl}/incomestatement`);
  }

  public getFinancialCondition(): Observable<FinancialCondition> {
    return this.http.get(`${this.baseUrl}/financialcondition`);
  }
}
