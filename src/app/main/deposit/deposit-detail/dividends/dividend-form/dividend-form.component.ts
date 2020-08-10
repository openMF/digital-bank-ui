import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FimsValidators } from '../../../../common/validator/validators';
import * as moment from 'moment';
import { toFimsDate } from '../../../../../services/domain/date.converter';

export interface DistributeDividendFormData {
  productDefinitionId: string;
  dueDate: {
    year?: number;
    month?: number;
    day?: number;
  };
  dividendRate: string;
}

@Component({
  selector: 'ngx-deposit-product-dividend-form',
  templateUrl: './dividend-form.component.html',
  styleUrls: ['./dividend-form.component.scss'],
})
export class DividendFormComponent implements OnInit {
  @Input() productDefinitionId: string;

  dividendForm: FormGroup;

  @Output() onSave = new EventEmitter<DistributeDividendFormData>();

  @Output() onCancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dividendForm = this.formBuilder.group({
      dueDate: ['', [Validators.required]],
      dividendRate: ['', [Validators.required, FimsValidators.minValue(0)]],
    });
  }

  get dueDate() {
    return this.dividendForm.get('dueDate');
  }

  get dividendRate() {
    return this.dividendForm.get('dividendRate');
  }

  save(): void {
    const dueDate = this.dividendForm.get('dueDate').value;

    this.onSave.emit({
      productDefinitionId: this.productDefinitionId,
      dueDate: toFimsDate(moment(dueDate).format('YYYY-MM-DD')),
      dividendRate: this.dividendForm.get('dividendRate').value,
    });
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
