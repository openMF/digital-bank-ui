import { Inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http/http.service';
import { Observable } from 'rxjs';
import { Catalog } from './domain/catalog.model';
import { Field } from './domain/field.model';

@Injectable()
export class CatalogService {
  constructor(@Inject('customerBaseUrl') private baseUrl: string, private http: HttpClientService) {}

  fetchCatalogs(): Observable<Catalog[]> {
    return this.http.get(`${this.baseUrl}/catalogs`);
  }

  createCatalog(catalog: Catalog): Observable<void> {
    return this.http.post(`${this.baseUrl}/catalogs`, catalog);
  }

  updateCatalog(catalog: Catalog): Observable<void> {
    return this.http.put(`${this.baseUrl}/catalogs/${catalog.identifier}`, catalog);
  }

  deleteCatalog(catalog: Catalog): Observable<void> {
    return this.http.delete(`${this.baseUrl}/catalogs/${catalog.identifier}`, {});
  }

  findCatalog(identifier: string, silent: boolean = false): Observable<Catalog> {
    return this.http.get(`${this.baseUrl}/catalogs/${identifier}`, {}, silent);
  }

  updateField(catalogIdentifier: string, field: Field): Observable<void> {
    return this.http.put(`${this.baseUrl}/catalogs/${catalogIdentifier}/fields/${field.identifier}`, field);
  }

  deleteField(catalogIdentifier: string, field: Field): Observable<void> {
    return this.http.delete(`${this.baseUrl}/catalogs/${catalogIdentifier}/fields/${field.identifier}`);
  }
}
