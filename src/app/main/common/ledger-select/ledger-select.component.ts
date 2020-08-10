import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FetchRequest } from '../../../services/domain/paging/fetch-request.model';
import { Observable } from 'rxjs';
import { AccountingService } from '../../../services/accounting/accounting.service';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Ledger } from '../../../services/accounting/domain/ledger.model';
import { LedgerPage } from '../../../services/accounting/domain/ledger-page.model';
import { AccountType } from '../../../services/accounting/domain/account-type.model';
import { distinctUntilChanged, debounceTime, tap, filter, switchMap, map } from 'rxjs/operators';
const noop: () => void = () => {
  // empty method
};

@Component({
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LedgerSelectComponent), multi: true }],
  selector: 'ngx-ledger-select',
  templateUrl: './ledger-select.component.html',
})
export class LedgerSelectComponent implements ControlValueAccessor, OnInit {
  _onTouchedCallback: () => void = noop;

  private _onChangeCallback: (_: any) => void = noop;

  formControl: FormControl;

  @Input() title: string;

  @Input() required: boolean;

  @Input() type: AccountType;

  ledgers: Observable<Ledger[]>;

  constructor(private accountingService: AccountingService) {}

  ngOnInit(): void {
    this.formControl = new FormControl('');

    this.ledgers = this.formControl.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      tap(name => this.changeValue(name)),
      filter(name => name),
      switchMap(name => this.onSearch(name)),
    );
  }

  changeValue(value: string): void {
    this._onChangeCallback(value);
  }

  writeValue(value: any): void {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  onSearch(searchTerm?: string): Observable<Ledger[]> {
    const fetchRequest: FetchRequest = {
      page: {
        pageIndex: 0,
        size: 5,
      },
      searchTerm,
    };

    return this.accountingService.fetchLedgers(true, fetchRequest, this.type).pipe(map((ledgerPage: LedgerPage) => ledgerPage.ledgers));
  }
}
