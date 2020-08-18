import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ProductDefinition } from '../../../services/depositAccount/domain/definition/product-definition.model';
import { ActivatedRoute } from '@angular/router';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FimsValidators } from '../../common/validator/validators';
import { interestPayableOptionList } from '../domain/interest-payable-option-list.model';
import { timeUnitOptionList } from '../domain/time-unit-option-list.model';
import { Charge } from '../../../services/depositAccount/domain/definition/charge.model';
import { Currency } from '../../../services/currency/domain/currency.model';
import { Action } from '../../../services/depositAccount/domain/definition/action.model';
import { typeOptionList } from '../domain/type-option-list.model';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Type } from '../../../services/depositAccount/domain/type.model';
import { DepositChargesComponent } from './deposit-charges/deposit-charges.component';
import { AccountingService } from '../../../services/accounting/accounting.service';
import { ledgerExists } from '../../common/validator/ledger-exists.validator';
import { accountExists } from '../../common/validator/account-exists.validator';

@Component({
  selector: 'ngx-deposit-form',
  templateUrl: './deposit-form.component.html',
  styleUrls: ['./deposit-form.component.scss'],
})
export class DepositFormComponent implements OnInit, OnDestroy, OnChanges {
  private termChangeSubscription: Subscription;

  private typeChangeSubscription: Subscription;

  interestPayableOptions = interestPayableOptionList;

  timeUnitOptions = timeUnitOptionList;

  typeOptions = typeOptionList;

  productForm: FormGroup;

  title: String;

  @ViewChild('chargesForm') chargesForm: DepositChargesComponent;
  charges: Charge[];

  @Input('editMode') editMode: boolean;

  @Input('definition') definition: ProductDefinition;

  @Input('currencies') currencies: Currency[];

  @Input('actions') actions: Action[];

  @Output() onSave = new EventEmitter<ProductDefinition>();

  @Output() onCancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private accountingService: AccountingService, private route: ActivatedRoute) {
    this.productForm = this.formBuilder.group({
      identifier: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32), FimsValidators.urlSafe]],
      type: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(256)]],
      description: ['', Validators.maxLength(2048)],
      currencyCode: ['', [Validators.required]],
      minimumBalance: ['', [Validators.required]],
      fixedTermEnabled: [false],
      interest: ['', [Validators.required, FimsValidators.minValue(0)]],
      flexible: [{ value: '', disabled: this.editMode }, [Validators.required]],
      termPeriod: [''],
      termTimeUnit: [''],
      termInterestPayable: ['', [Validators.required]],
      cashAccountIdentifier: ['', [Validators.required], accountExists(this.accountingService)],
      expenseAccountIdentifier: ['', [Validators.required], accountExists(this.accountingService)],
      equityLedgerIdentifier: ['', [Validators.required], ledgerExists(this.accountingService)],
      accrueAccountIdentifier: ['', [Validators.required], accountExists(this.accountingService)],
    });

    this.termChangeSubscription = this.productForm
      .get('fixedTermEnabled')
      .valueChanges.pipe(startWith(null))
      .subscribe(enabled => this.toggleFixedTerm(enabled));

    this.typeChangeSubscription = this.productForm
      .get('type')
      .valueChanges.pipe(startWith(null))
      .subscribe(type => this.toggleType(type));
  }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get termPeriod() {
    return this.productForm.get('termPeriod');
  }

  get minimumBalance() {
    return this.productForm.get('minimumBalance');
  }

  get type() {
    return this.productForm.get('type');
  }

  get currencyCode() {
    return this.productForm.get('currencyCode');
  }

  get interest() {
    return this.productForm.get('interest');
  }

  get termInterestPayable() {
    return this.productForm.get('termInterestPayable');
  }

  get flexible() {
    return this.productForm.get('flexible');
  }

  get cashAccountIdentifier() {
    return this.productForm.get('cashAccountIdentifier');
  }

  get expenseAccountIdentifier() {
    return this.productForm.get('expenseAccountIdentifier');
  }

  get equityLedgerIdentifier() {
    return this.productForm.get('equityLedgerIdentifier');
  }

  get accrueAccountIdentifier() {
    return this.productForm.get('accrueAccountIdentifier');
  }

  get fixedTermEnabled() {
    return this.productForm.get('fixedTermEnabled');
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.title = data.title;
    });
  }

  ngOnDestroy(): void {
    this.termChangeSubscription.unsubscribe();
    this.typeChangeSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.charges = this.definition.charges;
    const interestDisabled = this.editMode && !this.definition.flexible;
    const fixedTermEnabled: boolean = this.hasPeriodOrTimeUnit(this.definition);

    this.productForm.reset({
      identifier: this.definition.identifier,
      type: this.definition.type,
      name: this.definition.name,
      description: this.definition.description,
      currencyCode: this.definition.currency.code,
      minimumBalance: this.definition.minimumBalance.toFixed(2),
      fixedTermEnabled: fixedTermEnabled,
      interest: { value: this.definition.interest.toFixed(2), disabled: interestDisabled },
      flexible: { value: this.definition.flexible, disabled: this.editMode },
      termPeriod: this.definition.term.period,
      termTimeUnit: this.definition.term.timeUnit,
      termInterestPayable: this.definition.term.interestPayable,
      cashAccountIdentifier: this.definition.cashAccountIdentifier,
      expenseAccountIdentifier: this.definition.expenseAccountIdentifier,
      accrueAccountIdentifier: this.definition.accrueAccountIdentifier,
      equityLedgerIdentifier: this.definition.equityLedgerIdentifier,
    });
  }

  toggleFixedTerm(enabled: boolean): void {
    const termPeriodControl: FormControl = this.productForm.get('termPeriod') as FormControl;
    const termTimeUnitControl: FormControl = this.productForm.get('termTimeUnit') as FormControl;

    if (enabled) {
      this.enable(termPeriodControl, [Validators.required, FimsValidators.minValue(1), FimsValidators.maxScale(0)]);
      this.enable(termTimeUnitControl, [Validators.required]);
    } else {
      this.disable(termPeriodControl);
      this.disable(termTimeUnitControl);
    }
  }

  toggleType(type: Type): void {
    const enableAccrueAccount = type !== 'SHARE';
    const accrueAccountControl: FormControl = this.productForm.get('accrueAccountIdentifier') as FormControl;

    if (enableAccrueAccount) {
      this.enable(accrueAccountControl, [Validators.required], accountExists(this.accountingService));
    } else {
      this.disable(accrueAccountControl);
    }
  }

  private enable(formControl: FormControl, validators: ValidatorFn[], asyncValidator?: AsyncValidatorFn): void {
    formControl.enable();
    formControl.setValidators(validators);
    formControl.setAsyncValidators(asyncValidator);
    formControl.updateValueAndValidity();
  }

  private disable(formControl: FormControl): void {
    formControl.disable();
    formControl.clearValidators();
    formControl.updateValueAndValidity();
  }

  hasPeriodOrTimeUnit(product: ProductDefinition): boolean {
    return !!product.term.timeUnit || !!product.term.period;
  }

  save(): void {
    const foundCurrency = this.currencies.find(currency => currency.code === this.productForm.get('currencyCode').value);
    const isShare = this.productForm.get('type').value === 'SHARE';
    const fixedTerm: boolean = this.productForm.get('fixedTermEnabled').value === true;

    const definition: ProductDefinition = {
      identifier: this.productForm.get('identifier').value,
      type: this.productForm.get('type').value,
      name: this.productForm.get('name').value,
      description: this.productForm.get('description').value,
      minimumBalance: parseFloat(this.productForm.get('minimumBalance').value),
      interest: parseFloat(this.productForm.get('interest').value),
      flexible: this.productForm.get('flexible').value,
      term: {
        period: fixedTerm ? this.productForm.get('termPeriod').value : undefined,
        timeUnit: fixedTerm ? this.productForm.get('termTimeUnit').value : undefined,
        interestPayable: this.productForm.get('termInterestPayable').value,
      },
      currency: {
        code: foundCurrency.code,
        name: foundCurrency.name,
        sign: foundCurrency.sign,
        scale: foundCurrency.digits,
      },
      charges: this.chargesForm.formData,
      expenseAccountIdentifier: this.productForm.get('expenseAccountIdentifier').value,
      equityLedgerIdentifier: this.productForm.get('equityLedgerIdentifier').value,
      cashAccountIdentifier: this.productForm.get('cashAccountIdentifier').value,
      accrueAccountIdentifier: !isShare ? this.productForm.get('accrueAccountIdentifier').value : undefined,
    };

    this.onSave.emit(definition);
  }

  cancel(): void {
    this.onCancel.emit();
  }

  get isValid(): boolean {
    if (this.productForm && this.chargesForm) return this.productForm.valid && this.chargesForm.valid;
    else return false;
  }
}
