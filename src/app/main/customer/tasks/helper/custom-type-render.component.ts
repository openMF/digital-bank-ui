import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { defaultTypeOptions } from '../domain/type-options.model';

@Component({
  template: `
    {{ this.displayString }}
  `,
})
export class CustomTypeRenderComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  displayString: any;

  ngOnInit() {
    const type = this.rowData.type;
    this.displayString = defaultTypeOptions.find(option => option.type === type).label;
  }
}
