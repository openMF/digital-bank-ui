import { Component, Input } from '@angular/core';
import { FormComponent } from '../../../common/forms/form.component';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BUSINESS, ContactDetail, ContactDetailType, EMAIL, MOBILE, PHONE } from '../../../../services/domain/contact/contact-detail.model';
import { getContactDetailValueByType } from './contact.helper';
import { FimsValidators } from '../../../common/validator/validators';

@Component({
  selector: 'ngx-customer-contact-form',
  templateUrl: './contact.component.html',
})
export class CustomerContactFormComponent extends FormComponent<ContactDetail[]> {
  @Input() set formData(contactDetails: ContactDetail[]) {
    if (!contactDetails) {
      throw new Error('contact details must be defined');
    }

    let phone = '';
    let mobile = '';
    let email = '';

    const businessContacts: ContactDetail[] = contactDetails.filter(contactDetail => contactDetail.group === BUSINESS);

    if (businessContacts.length) {
      phone = getContactDetailValueByType(businessContacts, PHONE);
      mobile = getContactDetailValueByType(businessContacts, MOBILE);
      email = getContactDetailValueByType(businessContacts, EMAIL);
    }

    this.form = this.formBuilder.group({
      email: [email, [Validators.maxLength(32), FimsValidators.email]],
      phone: [phone, Validators.maxLength(32)],
      mobile: [mobile, Validators.maxLength(32)],
    });
  }

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  get formData(): ContactDetail[] {
    const contactDetails: ContactDetail[] = [];

    this.pushIfValue(contactDetails, this.form.get('email'), 'EMAIL');
    this.pushIfValue(contactDetails, this.form.get('mobile'), 'MOBILE');
    this.pushIfValue(contactDetails, this.form.get('phone'), 'PHONE');

    return contactDetails;
  }

  private pushIfValue(contactDetails: ContactDetail[], control: AbstractControl, type: ContactDetailType): void {
    if (control.value && control.value.length > 0) {
      contactDetails.push({
        group: 'BUSINESS',
        type: type,
        value: control.value,
        preferenceLevel: 1,
      });
    }
  }
}
