import { FormArray, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DataTypeOption, dataTypes } from '../domain/datatype-types.model';

@Component({
  selector: 'ngx-custom-field-form',
  templateUrl: './field.component.html',
})
export class FieldFormComponent implements OnChanges {
  @Input() form: FormGroup;

  @Input() editMode: boolean;

  @Output() onAddOption = new EventEmitter<void>();

  @Output() onRemoveOption = new EventEmitter<number>();

  dataTypeOptions: DataTypeOption[] = dataTypes;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.form) {
      this.form.get('dataType').valueChanges.subscribe(dataType => this.toggleDataType());

      this.toggleDataType();
    }
  }

  private toggleDataType(): void {
    const dataType = this.form.get('dataType').value;

    const lengthControl = this.form.get('length');
    const precisionControl = this.form.get('precision');
    const minValueControl = this.form.get('minValue');
    const maxValueControl = this.form.get('maxValue');
    const optionsControl = this.form.get('options');

    lengthControl.disable();
    precisionControl.disable();
    minValueControl.disable();
    maxValueControl.disable();
    optionsControl.disable();

    switch (dataType) {
      case 'TEXT': {
        if (!this.editMode) {
          lengthControl.enable();
        }
        break;
      }

      case 'NUMBER': {
        if (!this.editMode) {
          precisionControl.enable();
          minValueControl.enable();
          maxValueControl.enable();
        }
        break;
      }

      case 'SINGLE_SELECTION':
      case 'MULTI_SELECTION': {
        optionsControl.enable();
        break;
      }

      default:
        break;
    }
  }

  addOption(): void {
    this.onAddOption.emit();
  }

  removeOption(index: number): void {
    this.onRemoveOption.emit(index);
  }

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }
}
