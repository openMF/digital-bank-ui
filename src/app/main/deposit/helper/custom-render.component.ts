import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <nb-icon icon="{{ icon }}" status="{{ status }}" [options]="{ animation: { type: 'pulse' } }"></nb-icon>
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  icon: any;
  status: any;

  ngOnInit() {
    this.icon = this.rowData.active ? 'checkmark-circle-2' : 'close-circle';
    this.status = this.rowData.active ? 'success' : 'danger';
  }
}
