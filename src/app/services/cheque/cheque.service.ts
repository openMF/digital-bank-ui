import { Inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http/http.service';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { Cheque } from './domain/cheque.model';
import { IssuingCount } from './domain/issuing-count.model';
import { ChequeProcessingCommand } from './domain/cheque-processing-command';
import { ChequeTransaction } from './domain/cheque-transaction';
import { MICRResolution } from './domain/micr-resolution.model';
import { FimsCheque } from './domain/fims-cheque.model';
import { mapToFimsCheque, mapToFimsCheques } from './domain/mapper/fims-cheque.mapper';
import { map } from 'rxjs/operators';

@Injectable()
export class ChequeService {
  constructor(private http: HttpClientService, @Inject('chequeBaseUrl') private baseUrl: string) {}

  public issue(issuingCount: IssuingCount): Observable<string> {
    return this.http.post(`${this.baseUrl}/cheques/`, issuingCount);
  }

  public fetch(state?: string, accountIdentifier?: string): Observable<FimsCheque[]> {
    let search = new HttpParams();

    search = search.append('state', state);
    search = search.append('accountIdentifier', accountIdentifier);

    return this.http.get(`${this.baseUrl}/cheques/`, { search }).pipe(map((cheques: Cheque[]) => mapToFimsCheques(cheques)));
  }

  public get(identifier: string): Observable<FimsCheque> {
    return this.http.get(`${this.baseUrl}/cheques/${identifier}`).pipe(map((cheque: Cheque) => mapToFimsCheque(cheque)));
  }

  public process(identifier: string, command: ChequeProcessingCommand): Observable<void> {
    return this.http.post(`${this.baseUrl}/cheques/${identifier}/commands`, command);
  }

  public processTransaction(transaction: ChequeTransaction): Observable<void> {
    return this.http.post(`${this.baseUrl}/transactions/`, transaction);
  }

  public expandMicr(identifier: string): Observable<MICRResolution> {
    return this.http.get(`${this.baseUrl}/micr/${identifier}`, {}, true);
  }
}
