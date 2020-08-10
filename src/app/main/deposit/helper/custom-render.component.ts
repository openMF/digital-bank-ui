import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <nb-icon icon="{{ icon }}" [options]="{ animation: { type: 'pulse' } }"></nb-icon>
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  icon: any;

  ngOnInit() {
    this.icon = this.rowData.active ? 'checkmark-outline' : 'close-outline';
  }
}
