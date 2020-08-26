import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Error } from '../../../../../../services/domain/error.model';
import { FimsValidators } from '../../../../../common/validator/validators';

export interface IdentityCardScanFormData {
  identifier: string;
  description: string;
  file: File;
}

@Component({
  selector: 'ngx-identity-card-scan-form',
  templateUrl: './scan.form.component.html',
  styleUrls: ['./scan.form.component.scss'],
})
export class IdentificationCardScanComponent implements OnInit {
  form: FormGroup;

  @Input() editMode: boolean;

  @Input() set error(error: Error) {
    if (!error) {
      return;
    }

    this.form.get('identifier').setErrors({
      'unique': true,
    });
  }

  @Output() onSave = new EventEmitter<IdentityCardScanFormData>();

  @Output() onCancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      identifier: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32), FimsValidators.urlSafe]],
      description: ['', [Validators.required, Validators.maxLength(1024)]],
      file: ['', [Validators.required, FimsValidators.maxFileSize(512)]],
    });
  }

  save(): void {
    this.onSave.emit(this.form.getRawValue());
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
