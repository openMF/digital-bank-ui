import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpClientService } from '../http/http.service';
import { Error } from '../domain/error.model';
import { Office } from './domain/office.model';
import { FetchRequest } from '../domain/paging/fetch-request.model';
import { OfficePage } from './domain/office-page.model';
import { EmployeePage } from './domain/employee-page.model';
import { Employee } from './domain/employee.model';
import { buildSearchParams } from '../domain/paging/search-param.builder';
import { ContactDetail } from '../domain/contact/contact-detail.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OfficeService {
  constructor(private http: HttpClientService, @Inject('officeBaseUrl') private baseUrl: string) {}

  createOffice(office: Office): Observable<Office> {
    return this.http.post(this.baseUrl + '/offices', office).pipe(catchError(Error.handleError));
  }

  addBranch(id: string, office: Office): Observable<Office> {
    return this.http.post(this.baseUrl + '/offices/' + id, office).pipe(catchError(Error.handleError));
  }

  updateOffice(office: Office): Observable<Office> {
    return this.http.put(this.baseUrl + '/offices/' + office.identifier, office).pipe(catchError(Error.handleError));
  }

  deleteOffice(id: String): Observable<Office> {
    return this.http.delete(this.baseUrl + '/offices/' + id, {}).pipe(catchError(Error.handleError));
  }

  listOffices(fetchRequest?: FetchRequest): Observable<OfficePage> {
    const params: HttpParams = buildSearchParams(fetchRequest);

    return this.http.get(this.baseUrl + '/offices', { params }).pipe(catchError(Error.handleError));
  }

  listAllOffices(): Observable<OfficePage> {
    return this.http.get(this.baseUrl + '/offices').pipe(catchError(Error.handleError));
  }

  listBranches(parentIdentifier: string, fetchRequest?: FetchRequest): Observable<OfficePage> {
    const params: HttpParams = buildSearchParams(fetchRequest);

    return this.http.get(this.baseUrl + '/offices/' + parentIdentifier + '/branches', { params }).pipe(catchError(Error.handleError));
  }

  getOffice(id: string): Observable<Office> {
    return this.http.get(this.baseUrl + '/offices/' + id).pipe(catchError(Error.handleError));
  }

  listEmployees(fetchRequest?: FetchRequest): Observable<EmployeePage> {
    const params: HttpParams = buildSearchParams(fetchRequest);

    return this.http.get(this.baseUrl + '/employees', { params }).pipe(catchError(Error.handleError));
  }

  getEmployee(id: string, silent?: true): Observable<Employee> {
    return this.http.get(this.baseUrl + '/employees/' + id, {}, silent).pipe(catchError(Error.handleError));
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post(this.baseUrl + '/employees', employee).pipe(catchError(Error.handleError));
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put(this.baseUrl + '/employees/' + employee.identifier, employee).pipe(catchError(Error.handleError));
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete(this.baseUrl + '/employees/' + id, {}).pipe(catchError(Error.handleError));
  }

  setContactDetails(id: string, contactDetails: ContactDetail[]): Observable<void> {
    return this.http.put(this.baseUrl + '/employees/' + id + '/contacts', contactDetails);
  }
}
