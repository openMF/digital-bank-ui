import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export function optionValueUnique(array: FormArray): ValidationErrors | null {
  const options: FormGroup[] = array.controls as FormGroup[];

  const values = options.map(optionGroup => parseInt(optionGroup.get('value').value, 10));

  const set = new Set();

  values.forEach(number => set.add(number));

  if (set.size !== values.length) {
    return {
      optionValueUnique: true,
    };
  }

  return null;
}
