import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductInstance } from '../../../../services/depositAccount/domain/instance/product-instance.model';
import { ProductDefinition } from '../../../../services/depositAccount/domain/definition/product-definition.model';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../../../../services/customer/customer.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-deposit-form-component',
  templateUrl: './form.component.html',
})
export class DepositFormComponent implements OnInit {
  filteredCustomers: Observable<string[]>;

  detailForm: FormGroup;

  @Input('editMode') editMode: boolean;

  @Input('customerId') customerId: string;

  @Input('productDefinitions') productDefinitions: ProductDefinition[];

  @Input('productInstance') productInstance: ProductInstance;

  @Output() onSave = new EventEmitter<ProductInstance>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.detailForm = this.formBuilder.group({
      productIdentifier: [this.productInstance.productIdentifier, [Validators.required]],
      beneficiaries: [this.productInstance.beneficiaries ? this.productInstance.beneficiaries : []],
    });
  }

  get isValid(): boolean {
    return this.detailForm.valid;
  }

  save(): void {
    const productInstance: ProductInstance = {
      productIdentifier: this.detailForm.get('productIdentifier').value,
      beneficiaries: this.detailForm.get('beneficiaries').value,
      customerIdentifier: this.customerId,
      accountIdentifier: this.productInstance.accountIdentifier,
      state: this.productInstance.state,
    };

    this.onSave.emit(productInstance);
  }

  cancel(): void {
    this.onCancel.emit();
  }

  filterAsync(searchTerm: string): void {
    this.filteredCustomers = this.customerService
      .fetchCustomers({
        searchTerm,
      })
      .pipe(map(customerPage => customerPage.customers.map(customer => customer.identifier)));
  }
}
