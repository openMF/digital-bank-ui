import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalog } from '../../../../services/catalog/domain/catalog.model';
import { Field } from '../../../../services/catalog/domain/field.model';
import { FieldFormService } from '../services/field-form.service';
import { Option } from '../../../../services/catalog/domain/option.model';

@Component({
  selector: 'ngx-customer-catalog-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class CustomerCatalogFormComponent implements OnInit, OnChanges {
  form: FormGroup;

  @Input('catalog') catalog: Catalog;

  @Output() onSave = new EventEmitter<Catalog>();

  @Output() onCancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private fieldFormService: FieldFormService) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(256)]],
      description: ['', [Validators.maxLength(4096)]],
      fields: this.initFields([]),
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.catalog) {
      this.form.reset({
        name: this.catalog.name,
        description: this.catalog.description,
      });

      this.catalog.fields.forEach(field => this.addField(field));
    }
  }

  save(): void {
    const catalog: Catalog = Object.assign({}, this.catalog, {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      fields: this.form.get('fields').value,
    });

    this.onSave.emit(catalog);
  }

  cancel(): void {
    this.onCancel.emit();
  }

  private initFields(fields: Field[]): FormArray {
    const formControls: FormGroup[] = [];
    fields.forEach(allocation => formControls.push(this.initField(allocation)));
    return this.formBuilder.array(formControls);
  }

  private initField(field?: Field): FormGroup {
    const formGroup = this.fieldFormService.buildForm();

    this.fieldFormService.resetForm(formGroup, field);

    return formGroup;
  }

  addField(field?: Field): void {
    const fields: FormArray = this.form.get('fields') as FormArray;
    fields.push(this.initField(field));
  }

  removeField(index: number): void {
    const fields: FormArray = this.form.get('fields') as FormArray;
    fields.removeAt(index);
  }

  get fields(): AbstractControl[] {
    const fields: FormArray = this.form.get('fields') as FormArray;
    return fields.controls;
  }

  addOption(form: FormGroup, option?: Option): void {
    this.fieldFormService.addOption(form, option);
  }

  removeOption(form: FormGroup, index: number): void {
    this.fieldFormService.removeOption(form, index);
  }
}
