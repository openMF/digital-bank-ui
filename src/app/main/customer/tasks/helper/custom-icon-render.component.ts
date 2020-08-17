import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <nb-icon icon="{{ icon }}" status="{{ status }}"></nb-icon>
  `,
})
export class CustomIconRenderComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  icon: any;
  status: any;

  ngOnInit() {
    if (this.value) {
      this.icon = 'checkmark-circle-2';
      this.status = 'success';
    } else {
      this.icon = 'close-circle';
      this.status = 'danger';
    }
  }
}
