import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-interest-rate',
  templateUrl: './interest-rate.component.html',
  styleUrls: ['./interest-rate.component.scss'],
})
export class InterestRateComponent implements OnInit, OnDestroy {
  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  /** Settings for smart-table */
  settings = {
    actions: false,
    columns: {
      periodType: {
        title: 'Period Type',
      },
      period: {
        title: 'Period From / To',
      },
      amount: {
        title: 'Amount Range',
      },
      interest: {
        title: 'Interest',
      },
      description: {
        title: 'Description',
      },
    },
    mode: 'external',
  };

  sampleData = [
    {
      periodType: 'Months',
      period: '1-12',
      amount: '1 - 10000',
      interest: '4',
      description: 'First interest Rate chart',
    },
    {
      periodType: 'Months',
      period: '1-6',
      amount: '1 - 5000',
      interest: '3',
      description: 'Second interest Rate chart',
    },
    {
      periodType: 'Months',
      period: '1-6',
      amount: '1 - 9000',
      interest: '7',
      description: 'Third interest Rate chart',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.setInterestData(this.sampleData);
  }

  setInterestData(interestData: any) {
    this.source.load(interestData);
  }

  ngOnDestroy(): void {}
}
