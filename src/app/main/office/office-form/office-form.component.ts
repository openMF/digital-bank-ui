import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Office } from '../../../services/office/domain/office.model';
import { FimsValidators } from '../../common/validator/validators';
import { Address } from '../../../services/domain/address/address.model';
import { AddressFormComponent } from '../../common/address/address.component';

@Component({
  selector: 'ngx-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss'],
})
export class OfficeFormComponent implements OnInit {
  private _office: Office;
  detailForm: FormGroup;
  title: String;

  @ViewChild('addressForm') addressForm: AddressFormComponent;
  addressFormData: Address;

  @Input('editMode') editMode: boolean;

  @Input('office') set office(office: Office) {
    this._office = office;
    this.prepareForm(office);
  }

  @Output() onSave = new EventEmitter<Office>();

  @Output() onCancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  prepareForm(office: Office): void {
    this.detailForm = this.formBuilder.group({
      identifier: [office.identifier, [Validators.required, Validators.minLength(3), Validators.maxLength(32), FimsValidators.urlSafe]],
      name: [office.name, [Validators.required, Validators.maxLength(256)]],
      description: [office.description, Validators.maxLength(2048)],
    });
    this.addressFormData = office.address;
  }

  get identifier() {
    return this.detailForm.get('identifier');
  }

  get name() {
    return this.detailForm.get('name');
  }

  get description() {
    return this.detailForm.get('description');
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.title = data.title;
    });
  }

  get isValid(): boolean {
    if (this.addressForm && this.detailForm) return this.addressForm.valid && this.detailForm.valid;
    else return false;
  }

  save(): void {
    const office: Office = {
      identifier: this.detailForm.get('identifier').value,
      name: this.detailForm.get('name').value,
      description: this.detailForm.get('description').value,
    };

    if (this.addressForm.pristine) {
      office.address = this.office.address;
    } else {
      office.address = this.addressForm.formData;
    }

    this.onSave.emit(office);
  }

  cancel(): void {
    this.onCancel.emit();
  }

  get office(): Office {
    return this._office;
  }
}
