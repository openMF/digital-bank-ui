import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <nb-icon icon="{{ icon }}" status="{{ status }}"></nb-icon>
    &nbsp; {{ rowData.state }}
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  icon: any;
  status: any;

  ngOnInit() {
    if (this.rowData.state === 'ACTIVE') {
      this.icon = 'checkmark-circle-2';
      this.status = 'success';
    }
    if (this.rowData.state === 'PENDING') {
      this.icon = 'close-circle';
      this.status = 'danger';
    }
  }
}
