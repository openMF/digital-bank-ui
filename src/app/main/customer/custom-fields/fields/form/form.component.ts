import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../../../../services/catalog/domain/field.model';
import { Option } from '../../../../../services/catalog/domain/option.model';
import { FieldFormService } from '../../services/field-form.service';

@Component({
  selector: 'ngx-catalog-custom-field-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class CatalogFieldFormComponent implements OnInit, OnChanges {
  form: FormGroup;

  @Input('field') field: Field;

  @Output() onSave = new EventEmitter<Field>();

  @Output() onCancel = new EventEmitter<void>();

  constructor(private fieldFormService: FieldFormService) {
    this.form = fieldFormService.buildForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.field) {
      this.fieldFormService.resetForm(this.form, this.field);

      this.form.get('identifier').disable();
      this.form.get('dataType').disable();
      this.form.get('length').disable();
      this.form.get('precision').disable();
      this.form.get('minValue').disable();
      this.form.get('maxValue').disable();
    }
  }

  save(): void {
    const field: Field = Object.assign({}, this.field, {
      label: this.form.get('label').value,
      hint: this.form.get('hint').value,
      description: this.form.get('description').value,
      mandatory: this.form.get('mandatory').value,
      options: this.form.get('options').value,
    });

    this.onSave.emit(field);
  }

  cancel(): void {
    this.onCancel.emit();
  }

  addOption(option?: Option): void {
    this.fieldFormService.addOption(this.form, option);
  }

  removeOption(index: number): void {
    this.fieldFormService.removeOption(this.form, index);
  }
}
