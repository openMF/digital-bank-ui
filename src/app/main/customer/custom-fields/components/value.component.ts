import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Catalog } from '../../../../services/catalog/domain/catalog.model';
import { Value } from '../../../../services/catalog/domain/value.model';
import { Field, FieldDataType } from '../../../../services/catalog/domain/field.model';
import { Option } from '../../../../services/catalog/domain/option.model';

interface CustomCatalog {
  label: string;
  fields: CustomDetailField[];
}

interface CustomDetailField {
  label: string;
  value: string;
  dataType: FieldDataType;
}

@Component({
  selector: 'ngx-customer-custom-values',
  templateUrl: './value.component.html',
})
export class CustomerCustomValuesComponent implements OnChanges {
  @Input() catalog: Catalog;

  @Input() values: Value[];

  customCatalog: CustomCatalog;

  ngOnChanges(changes: SimpleChanges): void {
    this.customCatalog = this.buildCustomCatalogs(this.values, this.catalog);
  }

  private buildCustomCatalogs(values: Value[], catalog: Catalog): CustomCatalog {
    if (!values || !catalog || !catalog.fields) {
      return;
    }

    const customCatalog: CustomCatalog = {
      label: catalog.name,
      fields: [],
    };

    if (values) {
      for (const value of values) {
        const foundField: Field = catalog.fields.find((field: Field) => field.identifier === value.fieldIdentifier);

        let valueString: string = value.value;

        switch (foundField.dataType) {
          case 'SINGLE_SELECTION': {
            const foundOption = foundField.options.find((option: Option) => option.value === Number(valueString));
            valueString = foundOption.label;
            break;
          }

          case 'MULTI_SELECTION': {
            const optionValues = valueString ? valueString.split(',').map(optionValue => Number(optionValue)) : [];
            const foundOptions = foundField.options
              .filter((option: Option) => optionValues.indexOf(option.value) > -1)
              .map((option: Option) => option.label);
            valueString = foundOptions.join(', ');
            break;
          }

          default: {
            break;
          }
        }

        const customField: CustomDetailField = {
          label: foundField.label,
          value: valueString,
          dataType: foundField.dataType,
        };

        customCatalog.fields.push(customField);
      }
    }

    return customCatalog;
  }
}
