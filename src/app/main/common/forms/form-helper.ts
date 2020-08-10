import {AbstractControl} from '@angular/forms';

export function setSelections(key: string, control: AbstractControl, selections: string[]): void {
  const keyControl: AbstractControl = control.get(key);
  keyControl.setValue(selections && selections.length > 0 ? selections[0] : undefined);
  keyControl.markAsDirty();
}

export function setSelection(key: string, control: AbstractControl, selection: string): void {
  const keyControl: AbstractControl = control.get(key);
  keyControl.setValue(selection);
  keyControl.markAsDirty();
}

