import { Component, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-text-input',
  templateUrl: './text-input.component.html',
})
export class TextInputComponent {
  @HostBinding('attr.layout')
  @Input()
  layout = 'row';

  @Input() placeholder: string;

  @Input() controlName: string;

  @Input() form: FormGroup;

  @Input() type: string;

  @Input() hideIfDisabled = false;

  @Input() title = '';

  get hasRequiredError(): boolean {
    return this.hasError('required');
  }

  get hasMinLengthError(): boolean {
    return this.hasError('minlength');
  }

  get hasMaxLengthError(): boolean {
    return this.hasError('maxlength');
  }

  get hasEmailError(): boolean {
    return this.hasError('email');
  }

  get hasIsNumberError(): boolean {
    return this.hasError('isNumber');
  }

  get hasMinValueError(): boolean {
    return this.hasError('minValue');
  }

  get hasMaxValueError(): boolean {
    return this.hasError('maxValue');
  }

  get hasGreaterThanValueError(): boolean {
    return this.hasError('greaterThanValue');
  }

  get hasMaxScaleError(): boolean {
    return this.hasError('maxScale');
  }

  hasError(key: string): boolean {
    return this.form.get(this.controlName).hasError(key);
  }

  get show(): boolean {
    if (this.hideIfDisabled) {
      return this.form.get(this.controlName).status !== 'DISABLED';
    }

    return true;
  }
}
