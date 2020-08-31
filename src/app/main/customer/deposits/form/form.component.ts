import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductInstance } from '../../../../services/depositAccount/domain/instance/product-instance.model';
import { ProductDefinition } from '../../../../services/depositAccount/domain/definition/product-definition.model';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../../../../services/customer/customer.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-deposit-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class DepositFormComponent implements OnInit {
  filteredCustomers: Observable<string[]>;

  detailForm: FormGroup;

  title: string;

  @Input('editMode') editMode: boolean;

  @Input('customerId') customerId: string;

  @Input('productDefinitions') productDefinitions: ProductDefinition[];

  @Input('productInstance') productInstance: ProductInstance;

  @Output() onSave = new EventEmitter<ProductInstance>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.title = data.title;
    });
    this.detailForm = this.formBuilder.group({
      productIdentifier: [this.productInstance.productIdentifier, [Validators.required]],
      beneficiaries: [this.productInstance.beneficiaries ? this.productInstance.beneficiaries : []],
    });
    this.filterAsync();
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

  filterAsync(): void {
    this.filteredCustomers = this.customerService
      .fetchCustomers({})
      .pipe(map(customerPage => customerPage.customers.map(customer => customer.identifier)));
  }
}
