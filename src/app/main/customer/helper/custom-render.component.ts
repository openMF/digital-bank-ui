import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <nb-icon icon="{{ icon }}" status="{{ status }}"></nb-icon>
    &nbsp; {{ data }}
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  icon: any;
  status: any;
  data: string;

  ngOnInit() {
    if (this.rowData.currentState === 'ACTIVE') {
      this.data = this.rowData.currentState;
      this.icon = 'checkmark-circle-2';
      this.status = 'success';
    }
    if (this.rowData.currentState === 'PENDING') {
      this.data = this.rowData.currentState;
      this.icon = 'close-circle';
      this.status = 'danger';
    }
    if (this.rowData.currentState === 'LOCKED') {
      this.data = this.rowData.currentState;
      this.icon = 'lock-outline';
      this.status = 'basic';
    }
    if (this.rowData.state === 'ACTIVE') {
      this.data = this.rowData.state;
      this.icon = 'checkmark-circle-2';
      this.status = 'success';
    }
    if (this.rowData.state === 'PENDING') {
      this.data = this.rowData.state;
      this.icon = 'close-circle';
      this.status = 'danger';
    }
  }
}
