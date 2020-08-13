import { Inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { buildSearchParams } from '../domain/paging/search-param.builder';
import { PayrollPaymentPage } from './domain/payroll-payment-page.model';
import { Observable } from 'rxjs';
import { FetchRequest } from '../domain/paging/fetch-request.model';
import { PayrollCollectionHistory } from './domain/payroll-collection-history.model';
import { PayrollCollectionSheet } from './domain/payroll-collection-sheet.model';
import { HttpClientService } from '../http/http.service';
import { PayrollConfiguration } from './domain/payroll-configuration.model';

@Injectable()
export class PayrollService {
  constructor(private http: HttpClientService, @Inject('payrollBaseUrl') private baseUrl: string) {}

  public distribute(sheet: PayrollCollectionSheet): Observable<void> {
    return this.http.post(`${this.baseUrl}/distribution`, sheet);
  }

  public fetchDistributionHistory(): Observable<PayrollCollectionHistory[]> {
    return this.http.get(`${this.baseUrl}/distribution`);
  }

  public fetchPayments(identifier: string, fetchRequest?: FetchRequest): Observable<PayrollPaymentPage> {
    const params: HttpParams = buildSearchParams(fetchRequest);

    return this.http.get(`${this.baseUrl}/distribution/${identifier}/payments`, { params });
  }

  setPayrollConfiguration(customerId: string, configuration: PayrollConfiguration): Observable<void> {
    return this.http.put(`${this.baseUrl}/customers/${customerId}/payroll`, configuration);
  }

  findPayrollConfiguration(customerId: string, silent: boolean = false): Observable<PayrollConfiguration> {
    return this.http.get(`${this.baseUrl}/customers/${customerId}/payroll`, {}, silent);
  }
}
