import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormComponent } from '../../../../common/forms/form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { IdentificationCard } from '../../../../../services/customer/domain/identification-card.model';
import { ExpirationDate } from '../../../../../services/customer/domain/expiration-date.model';
import { FimsValidators } from '../../../../common/validator/validators';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'ngx-identity-card-form',
  templateUrl: './identity-card-form.component.html',
  styleUrls: ['./identity-card-form.component.scss'],
})
export class IdentityCardFormComponent extends FormComponent<IdentificationCard> implements OnInit {
  @Input() identificationCard: IdentificationCard;

  @Input() editMode = false;

  @Output() onSave = new EventEmitter<IdentificationCard>();

  @Output() onCancel = new EventEmitter<void>();

  title: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.title = data.title;
    });
    this.form = this.formBuilder.group({
      number: [
        this.identificationCard.number,
        [Validators.required, Validators.minLength(3), Validators.maxLength(32), FimsValidators.urlSafe],
      ],
      type: [this.identificationCard.type, [Validators.required, Validators.maxLength(128)]],
      expirationDate: [this.formatDate(this.identificationCard.expirationDate), [Validators.required, FimsValidators.afterToday]],
      issuer: [this.identificationCard.issuer, [Validators.required, Validators.maxLength(256)]],
    });
  }

  get expirationDate() {
    return this.form.get('expirationDate');
  }

  showNumberValidationError(): void {
    this.setError('number', 'unique', true);
  }

  private formatDate(expirationDate: ExpirationDate): string {
    if (!expirationDate) {
      return '';
    }
    return `${expirationDate.year}-${this.addZero(expirationDate.month)}-${this.addZero(expirationDate.day)}`;
  }

  private addZero(value: number): string {
    return ('0' + value).slice(-2);
  }

  get formData(): IdentificationCard {
    return;
  }

  cancel(): void {
    this.onCancel.emit();
  }

  save(): void {
    const expirationDate: string = moment(this.form.get('expirationDate').value).format('YYYY-MM-DD');
    const chunks: string[] = expirationDate.split('-');

    const identificationCard: IdentificationCard = {
      type: this.form.get('type').value,
      number: this.form.get('number').value,
      expirationDate: {
        day: Number(chunks[2]),
        month: Number(chunks[1]),
        year: Number(chunks[0]),
      },
      issuer: this.form.get('issuer').value,
    };

    this.onSave.emit(identificationCard);
  }
}
