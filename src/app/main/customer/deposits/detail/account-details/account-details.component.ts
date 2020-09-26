import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  /** Settings for smart-table */
  settings = {
    actions: false,
    columns: {
      type: {
        title: 'Type',
      },
      original: {
        title: 'Original',
      },
      paid: {
        title: 'Paid',
      },
      waived: {
        title: 'Waived',
      },
      writtenOff: {
        title: 'Written Off',
      },
      outstanding: {
        title: 'Outstanding',
      },
      overdue: {
        title: 'Overdue',
      },
    },
    mode: 'external',
  };

  sampleData = [
    {
      type: 'Principal',
      original: '5000',
      paid: '0',
      waived: '0',
      writtenOff: '0',
      outstanding: '5000',
      overdue: '4287.16',
    },
    {
      type: 'Interest',
      original: '927',
      paid: '0',
      waived: '0',
      writtenOff: '0',
      outstanding: '927',
      overdue: '899.16',
    },
    {
      type: 'Fees',
      original: '0',
      paid: '0',
      waived: '0',
      writtenOff: '0',
      outstanding: '5000',
      overdue: '0',
    },
    {
      type: 'Penalties',
      original: '0',
      paid: '0',
      waived: '0',
      writtenOff: '0',
      outstanding: '5000',
      overdue: '0',
    },
    {
      type: 'Total',
      original: '5927',
      paid: '0',
      waived: '0',
      writtenOff: '0',
      outstanding: '5927',
      overdue: '5186.16',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.setAccountData(this.sampleData);
  }

  setAccountData(accountData: any) {
    this.source.load(accountData);
  }

  ngOnDestroy(): void {}
}
