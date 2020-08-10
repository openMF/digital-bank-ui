import { AbstractControl, FormGroup } from '@angular/forms';

export abstract class FormComponent<T> {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({});
  }

  abstract get formData(): T;

  abstract set formData(data: T);

  get pristine(): boolean {
    if (!this.form) {
      return true;
    }
    return this.form.pristine;
  }

  get valid(): boolean {
    if (!this.form) {
      return true;
    }
    return this.form.valid;
  }

  get dirty(): boolean {
    if (!this.form) {
      return true;
    }
    return this.form.dirty;
  }

  /**
   * Checks if form is pristine before doing valid check
   * @returns {boolean}
   */
  get validWhenOptional(): boolean {
    if (!this.pristine && this.valid) {
      return true;
    } else if (!this.pristine && !this.valid) {
      return false;
    }
    return true;
  }

  setError(field: string, error: string, value: any): void {
    const control: AbstractControl = this.form.get(field);
    const errors = control.errors || {};
    errors[error] = value;
    control.setErrors(errors);
  }
}
