import { Inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http/http.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProductDefinition } from './domain/definition/product-definition.model';
import { ProductDefinitionCommand } from './domain/definition/product-definition-command.model';
import { ProductInstance } from './domain/instance/product-instance.model';
import { Action } from './domain/definition/action.model';
import { DividendDistribution } from './domain/definition/dividend-distribution.model';
import { AvailableTransactionType } from './domain/instance/available-transaction-type.model';

@Injectable()
export class DepositAccountService {
  constructor(private http: HttpClientService, @Inject('depositAccountBaseUrl') private baseUrl: string) {}

  createProductDefinition(productDefinition: ProductDefinition): Observable<void> {
    return this.http.post(`${this.baseUrl}/definitions`, productDefinition);
  }

  updateProductDefinition(productDefinition: ProductDefinition): Observable<void> {
    return this.http.put(`${this.baseUrl}/definitions/${productDefinition.identifier}`, productDefinition);
  }

  deleteProductDefinition(identifier: string): Observable<void> {
    return this.http.delete(`${this.baseUrl}/definitions/${identifier}`);
  }

  fetchProductDefinitions(): Observable<ProductDefinition[]> {
    return this.http.get(`${this.baseUrl}/definitions`);
  }

  findProductDefinition(identifier: string): Observable<ProductDefinition> {
    return this.http.get(`${this.baseUrl}/definitions/${identifier}`);
  }

  processCommand(identifier: string, command: ProductDefinitionCommand): Observable<void> {
    return this.http.post(`${this.baseUrl}/definitions/${identifier}/commands`, command);
  }

  fetchDividendDistributions(identifier: string): Observable<DividendDistribution[]> {
    return this.http.get(`${this.baseUrl}/definitions/${identifier}/dividends`);
  }

  distributeDividend(identifier: string, dividendDistribution: DividendDistribution): Observable<void> {
    return this.http.post(`${this.baseUrl}/definitions/${identifier}/dividends`, dividendDistribution);
  }

  createProductInstance(productInstance: ProductInstance): Observable<void> {
    return this.http.post(`${this.baseUrl}/instances`, productInstance);
  }

  updateProductInstance(productInstance: ProductInstance): Observable<void> {
    return this.http.put(`${this.baseUrl}/instances/${productInstance.accountIdentifier}`, productInstance);
  }

  findProductInstance(identifier: string): Observable<ProductInstance> {
    return this.http.get(`${this.baseUrl}/instances/${identifier}`);
  }

  fetchProductInstances(customerIdentifier: string, productIdentifier?: string): Observable<ProductInstance[]> {
    const search = new HttpParams();

    search.append('customer', customerIdentifier);
    search.append('product', productIdentifier);

    return this.http.get(`${this.baseUrl}/instances`, { search });
  }

  fetchActions(): Observable<Action[]> {
    return this.http.get(`${this.baseUrl}/actions`);
  }

  fetchPossibleTransactionTypes(customerIdentifier: string): Observable<AvailableTransactionType[]> {
    const search = new HttpParams();

    search.append('customer', customerIdentifier);

    return this.http.get(`${this.baseUrl}/instances/transactiontypes`, { search });
  }
}
