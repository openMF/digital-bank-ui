import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import * as moment from 'moment';

@Component({
  template: `
    {{ this.date }}
  `,
})
export class CustomDateRenderComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  date: any;

  ngOnInit() {
    const data = this.rowData.lastModifiedOn;
    if (data) this.date = moment(data).format('YYYY-MM-DD');
    else this.date = null;
  }
}
