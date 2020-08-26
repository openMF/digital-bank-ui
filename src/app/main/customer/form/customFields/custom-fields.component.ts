import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Catalog } from '../../../../services/catalog/domain/catalog.model';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Field } from '../../../../services/catalog/domain/field.model';
import { Value } from '../../../../services/catalog/domain/value.model';
import { FormComponent } from '../../../common/forms/form.component';
import { FimsValidators } from '../../../common/validator/validators';
import { addCurrentTime } from '../../../../services/domain/date.converter';
import { Option } from '../../../../services/catalog/domain/option.model';

@Component({
  selector: 'ngx-custom-fields-component',
  templateUrl: './custom-fields.component.html',
})
export class CustomerCustomFieldsComponent extends FormComponent<Value[]> implements OnChanges {
  private _formData: Value[];

  @Input('catalog') catalog: Catalog;

  @Input('formData') set formData(formData: Value[]) {
    this._formData = formData;
  }

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.catalog || changes.formData) {
      this.form = this.buildFormGroup();
    }
  }

  private findValue(fieldIdentifier: string): Value {
    return this._formData.find((value: Value) => value.fieldIdentifier === fieldIdentifier);
  }

  private findField(fieldIdentifier: string): Field {
    return this.catalog.fields.find((field: Field) => field.identifier === fieldIdentifier);
  }

  private buildFormGroup(): FormGroup {
    const group: FormGroup = this.formBuilder.group({});

    if (!this._formData || !this.catalog) {
      return group;
    }

    for (const field of this.catalog.fields) {
      const value = this.findValue(field.identifier);

      const valueString: string = value && value.value ? value.value : '';

      const formControl: FormControl = new FormControl({ value: valueString, disabled: false });

      const validators: ValidatorFn[] = [];

      switch (field.dataType) {
        case 'TEXT': {
          validators.push(...this.buildTextValidators(field));
          break;
        }

        case 'NUMBER': {
          formControl.setValue(valueString.length ? Number(valueString) : undefined);
          validators.push(...this.buildNumberValidators(field));
          break;
        }

        case 'DATE': {
          formControl.setValue(valueString.length ? valueString.substring(0, 10) : '');
          break;
        }

        case 'SINGLE_SELECTION': {
          formControl.setValue(valueString.length ? Number(valueString) : undefined);
          break;
        }

        case 'MULTI_SELECTION': {
          const optionValues = valueString.length ? valueString.split(',').map(optionValue => Number(optionValue)) : [];
          const foundOptions = field.options.filter((option: Option) => optionValues.indexOf(option.value) > -1);
          formControl.setValue(foundOptions);
          break;
        }

        default:
          break;
      }

      if (field.mandatory) {
        validators.push(Validators.required);
      }

      formControl.setValidators(validators);

      group.addControl(field.identifier, formControl);
    }

    return group;
  }

  get formData(): Value[] {
    const fields: any = this.form.getRawValue();

    const values: Value[] = [];

    for (const fieldIdentifier in fields) {
      if (fields.hasOwnProperty(fieldIdentifier)) {
        let value = fields[fieldIdentifier];

        const field: Field = this.findField(fieldIdentifier);

        if (value == null || value.length === 0) {
          continue;
        }

        switch (field.dataType) {
          case 'NUMBER': {
            value = value.toString();
            break;
          }

          case 'DATE': {
            const date = new Date(value);
            value = addCurrentTime(date).toISOString();
            break;
          }

          case 'SINGLE_SELECTION': {
            value = value.toString();
            break;
          }

          case 'MULTI_SELECTION': {
            value = value.map(fieldValue => fieldValue.value).join(',');
            break;
          }
        }

        values.push({
          catalogIdentifier: this.catalog.identifier,
          fieldIdentifier,
          value,
        });
      }
    }
    return values;
  }

  private buildTextValidators(field: Field): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (field.length != null) {
      validators.push(Validators.maxLength(field.length));
    }

    return validators;
  }

  private buildNumberValidators(field: Field): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (field.minValue != null) {
      validators.push(FimsValidators.minValue(field.minValue));
    }

    if (field.maxValue != null) {
      validators.push(FimsValidators.maxValue(field.maxValue));
    }

    if (field.precision != null) {
      validators.push(FimsValidators.maxScale(field.precision));
    }

    return validators;
  }
}
