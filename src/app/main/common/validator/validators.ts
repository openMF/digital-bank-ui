import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { todayAsISOString } from '../../../services/domain/date.converter';

// tslint:disable-next-line:max-line-length
const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

export function isEmptyInputValue(value: any): boolean {
  return value == null || value.length === 0;
}

export function isString(value: any): boolean {
  return typeof value === 'string';
}

export class FimsValidators {
  static urlSafe(control: AbstractControl): ValidationErrors | null {
    const notAllowed: string[] = ['!', `'`, '(', ')', '~'];

    const foundNotAllowed = notAllowed.find(char => control.value.indexOf(char) > -1);

    if (control.value && (encodeURIComponent(control.value) !== control.value || !!foundNotAllowed)) {
      return {
        urlSafe: true,
      };
    }
    return null;
  }

  static isNumber(control: AbstractControl): ValidationErrors | null {
    if (control.value && isNaN(control.value)) {
      return {
        isNumber: true,
      };
    }
    return null;
  }

  static scale(scale: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!isEmptyInputValue(c.value)) {
        const stringValue = String(c.value);

        const valueChunks = stringValue.split('.');

        if (valueChunks.length === 1 && scale === 0) {
          return null;
        }

        if (valueChunks.length === 2 && valueChunks[1].length === scale) {
          return null;
        }

        return {
          scale: {
            valid: false,
            value: scale,
          },
        };
      }
      return null;
    };
  }

  static maxScale(scale: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!isEmptyInputValue(c.value)) {
        const stringValue = String(c.value);
        const valueChunks = stringValue.split('.');

        if (valueChunks.length === 2 && valueChunks[1].length > scale) {
          return {
            maxScale: {
              valid: false,
              value: scale,
            },
          };
        }
      }
      return null;
    };
  }

  static minValue(minValue: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!isEmptyInputValue(c.value) && c.value < minValue) {
        return {
          minValue: {
            valid: false,
            value: minValue,
          },
        };
      }
      return null;
    };
  }

  static maxValue(maxValue: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!isEmptyInputValue(c.value) != null && c.value > maxValue) {
        return {
          maxValue: {
            valid: false,
            value: maxValue,
          },
        };
      }
      return null;
    };
  }

  static greaterThanValue(greaterThanValue: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!isEmptyInputValue(c.value) && c.value <= greaterThanValue) {
        return {
          greaterThanValue: {
            valid: false,
            value: greaterThanValue,
          },
        };
      }
      return null;
    };
  }

  static greaterThan(firstValue: string, secondValue: string) {
    return (group: FormGroup): ValidationErrors | null => {
      const firstNumber: number = Number(group.controls[firstValue].value);
      const secondNumber: number = Number(group.controls[secondValue].value);

      if (firstNumber == null || secondNumber == null) {
        return null;
      }

      if (firstNumber >= secondNumber) {
        return {
          greaterThan: true,
        };
      }

      return null;
    };
  }

  static greaterThanEquals(firstValue: string, secondValue: string) {
    return (group: FormGroup): ValidationErrors | null => {
      const firstNumber: number = Number(group.controls[firstValue].value);
      const secondNumber: number = Number(group.controls[secondValue].value);

      if (firstNumber == null || secondNumber == null) {
        return null;
      }

      if (firstNumber > secondNumber) {
        return {
          greaterThanEquals: true,
        };
      }

      return null;
    };
  }

  static matchValues(firstValue: string, secondValue: string) {
    return (group: FormGroup): ValidationErrors | null => {
      const val1 = group.controls[firstValue];
      const val2 = group.controls[secondValue];

      if (val1.value !== val2.value) {
        return {
          'mismatch': true,
        };
      }

      return null;
    };
  }

  static matchRange(firstValue: string, secondValue: string) {
    return (group: FormGroup): ValidationErrors | null => {
      const val1: AbstractControl = group.controls[firstValue];
      const val2: AbstractControl = group.controls[secondValue];

      const dateStart: number = Date.parse(val1.value);
      const dateEnd: number = Date.parse(val2.value);

      if (dateStart > dateEnd) {
        return {
          rangeInvalid: true,
        };
      }

      return null;
    };
  }

  static email(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }

    return EMAIL_REGEXP.test(control.value) ? null : { 'email': true };
  }

  static maxFileSize(maxSizeInKB: number) {
    return (c: AbstractControl): ValidationErrors | null => {
      const bytes: number = maxSizeInKB * 1024;
      if (!isEmptyInputValue(c.value) && c.value.size > bytes) {
        return {
          maxFileSize: {
            value: maxSizeInKB,
          },
        };
      }
      return null;
    };
  }

  static requiredNotEmpty(control: AbstractControl): ValidationErrors | null {
    return isEmptyInputValue(control.value) || (isString(control.value) && control.value.trim() === '') ? { 'required': true } : null;
  }

  static beforeToday(control: AbstractControl): ValidationErrors | null {
    const date = new Date(Date.parse(control.value));

    const today = new Date(Date.parse(todayAsISOString()));

    if (date >= today) {
      return {
        beforeToday: true,
      };
    }
    return null;
  }

  static afterToday(control: AbstractControl): ValidationErrors | null {
    const date = new Date(Date.parse(control.value));

    const today = new Date(Date.parse(todayAsISOString()));

    if (date <= today) {
      return {
        afterToday: true,
      };
    }
    return null;
  }

  static compareFunction(direction: any, a: any, b: any) {
    // Converting strings to lowercase
    const first = typeof a === 'string' ? a.toLowerCase() : a;
    const second = typeof b === 'string' ? b.toLowerCase() : b;

    if (first < second) {
      return -1 * direction;
    }
    if (first > second) {
      return direction;
    }
    return 0;
  }
}
