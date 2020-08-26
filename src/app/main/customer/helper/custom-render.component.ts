import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <nb-icon icon="{{ icon }}" status="{{ status }}"></nb-icon>
    &nbsp; {{ this.rowData.currentState }}
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  icon: any;
  status: any;

  ngOnInit() {
    if (this.rowData.currentState === 'ACTIVE') {
      this.icon = 'checkmark-circle-2';
      this.status = 'success';
    }
    if (this.rowData.currentState === 'PENDING') {
      this.icon = 'close-circle';
      this.status = 'danger';
    }
    if (this.rowData.currentState === 'LOCKED') {
      this.icon = 'lock-outline';
      this.status = 'basic';
    }
  }
}
