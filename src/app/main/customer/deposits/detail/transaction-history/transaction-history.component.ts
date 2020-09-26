import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit, OnDestroy {
  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  /** Settings for smart-table */
  settings = {
    actions: false,
    columns: {
      identifier: {
        title: 'ID',
      },
      date: {
        title: 'Transaction Date',
      },
      type: {
        title: 'Transaction Type',
      },
      debit: {
        title: 'Debit',
      },
      credit: {
        title: 'Credit',
      },
      balance: {
        title: 'Balance',
      },
    },
    mode: 'external',
  };

  sampleData = [
    {
      identifier: '487944',
      date: '31 August 2020',
      type: 'Deposit',
      debit: '0',
      credit: '1',
      balance: '1012.12',
    },
    {
      identifier: '481244',
      date: '25 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
    {
      identifier: '487644',
      date: '21 August 2020',
      type: 'Interest posting',
      debit: '0',
      credit: '10',
      balance: '1012.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1022.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1032.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1042.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
    {
      identifier: '481244',
      date: '20 August 2020',
      type: 'Withdraw',
      debit: '10',
      credit: '0',
      balance: '1002.12',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.setTransactionsData(this.sampleData);
  }

  setTransactionsData(transactionsData: any) {
    this.source.load(transactionsData);
  }

  ngOnDestroy(): void {}
}
