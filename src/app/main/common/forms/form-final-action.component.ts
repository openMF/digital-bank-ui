import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-form-final-action',
  templateUrl: './form-final-action.component.html',
})
export class FormFinalActionComponent {
  @Input() resourceName: string;

  @Input() editMode: boolean;

  @Input() disabled: boolean;

  @Output() onSave = new EventEmitter<any>();

  @Output() onCancel = new EventEmitter<any>();

  save() {
    this.onSave.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
