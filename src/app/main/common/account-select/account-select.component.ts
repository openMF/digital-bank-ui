import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FetchRequest } from '../../../services/domain/paging/fetch-request.model';
import { Observable } from 'rxjs';
import { AccountingService } from '../../../services/accounting/accounting.service';
import { Account } from '../../../services/accounting/domain/account.model';
import { AccountPage } from '../../../services/accounting/domain/account-page.model';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AccountType } from '../../../services/accounting/domain/account-type.model';
import { distinctUntilChanged, debounceTime, tap, filter, switchMap, map } from 'rxjs/operators';

const noop: () => void = () => {
  // empty method
};

@Component({
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AccountSelectComponent), multi: true }],
  selector: 'ngx-account-select',
  templateUrl: './account-select.component.html',
})
export class AccountSelectComponent implements ControlValueAccessor, OnInit {
  formControl: FormControl;

  @Input() title: string;

  @Input() required: boolean;

  @Input() type: AccountType;

  accounts: Observable<Account[]>;

  _onTouchedCallback: () => void = noop;

  private _onChangeCallback: (_: any) => void = noop;

  constructor(private accountingService: AccountingService) {}

  ngOnInit(): void {
    this.formControl = new FormControl('');

    this.accounts = this.formControl.valueChanges.pipe(
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

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  onSearch(searchTerm?: string): Observable<Account[]> {
    const fetchRequest: FetchRequest = {
      page: {
        pageIndex: 0,
        size: 5,
      },
      searchTerm: searchTerm,
    };

    return this.accountingService.fetchAccounts(fetchRequest, this.type).pipe(map((accountPage: AccountPage) => accountPage.accounts));
  }

}
