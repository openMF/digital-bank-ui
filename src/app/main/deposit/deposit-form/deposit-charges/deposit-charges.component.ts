import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Charge } from '../../../../services/depositAccount/domain/definition/charge.model';
import { FormComponent } from '../../../common/forms/form.component';
import { Action } from '../../../../services/depositAccount/domain/definition/action.model';
import { accountExists } from '../../../common/validator/account-exists.validator';
import { AccountingService } from '../../../../services/accounting/accounting.service';
import { FimsValidators } from '../../../common/validator/validators';

@Component({
  selector: 'ngx-deposit-charges',
  templateUrl: './deposit-charges.component.html',
  styleUrls: ['./deposit-charges.component.scss'],
})
export class DepositChargesComponent extends FormComponent<Charge[]> {
  @Input('actions') actions: Action[];

  @Input('formData') set formData(charges: Charge[]) {
    charges = charges || [];
    this.form = this.formBuilder.group({
      charges: this.initCharges(charges),
    });
  }

  constructor(private formBuilder: FormBuilder, private accountingService: AccountingService) {
    super();
  }

  get formData(): Charge[] {
    const charges = this.form.get('charges').value;

    return charges.map((charge: any) =>
      Object.assign({}, charge, {
        amount: parseFloat(charge.amount),
      }),
    );
  }

  private initCharges(charges: Charge[]): FormArray {
    const formControls: FormGroup[] = [];
    charges.forEach(charge => formControls.push(this.initCharge(charge)));
    return this.formBuilder.array(formControls);
  }

  private initCharge(charge?: Charge): FormGroup {
    const amount = charge ? charge.amount : 0;

    return this.formBuilder.group({
      actionIdentifier: [charge ? charge.actionIdentifier : '', Validators.required],
      incomeAccountIdentifier: [charge ? charge.incomeAccountIdentifier : '', [Validators.required], accountExists(this.accountingService)],
      name: [charge ? charge.name : '', [Validators.required, Validators.maxLength(256)]],
      description: [charge ? charge.description : '', Validators.maxLength(2048)],
      proportional: [charge ? charge.proportional : false],
      amount: [amount.toFixed(2), [FimsValidators.minValue(0)]],
    });
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get amount() {
    return this.form.get('amount');
  }

  addCharge(): void {
    const charges: FormArray = this.form.get('charges') as FormArray;
    charges.push(this.initCharge());
  }

  removeCharge(index: number): void {
    const charges: FormArray = this.form.get('charges') as FormArray;
    charges.removeAt(index);
  }

  get charges(): AbstractControl[] {
    const charges: FormArray = this.form.get('charges') as FormArray;
    return charges.controls;
  }

  getFormGroup(index: number): FormGroup {
    const charges = this.form.get('charges') as FormArray;
    return charges.at(index) as FormGroup;
  }
}
