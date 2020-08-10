import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromDepositAccounts from '../../store/index';
import { Store } from '@ngrx/store';
import { LOAD_ALL } from '../../store/dividends/dividend.actions';
import { Subscription } from 'rxjs/Subscription';
import { filter, map } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';
import { DisplayFimsDate } from '../../../common/date/fims-date.pipe';

@Component({
  providers: [DisplayFimsDate],
  selector: 'ngx-dividends',
  templateUrl: './dividends.component.html',
  styleUrls: ['./dividends.component.scss'],
})
export class DividendsComponent implements OnInit, OnDestroy {
  private productSubscription: Subscription;
  private dividendSubscription: Subscription;

  private productIdentifer: string;

  dividendData$: any;

  source: LocalDataSource = new LocalDataSource();

  /** Settings for smart-table */
  settings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      dueDate: {
        title: 'Due date',
      },
      dividendRate: {
        title: 'Dividend rate',
      },
    },
    mode: 'external',
    pager: {
      display: false,
    },
  };

  constructor(private store: Store<fromDepositAccounts.State>, private displayFimsDate: DisplayFimsDate) {}

  ngOnInit() {
    this.productSubscription = this.store
      .select(fromDepositAccounts.getSelectedProduct)
      .pipe(filter(product => !!product))
      .subscribe(product => (this.productIdentifer = product.identifier));

    this.store.dispatch({
      type: LOAD_ALL,
      payload: this.productIdentifer,
    });

    this.dividendData$ = this.store.select(fromDepositAccounts.getDividends).pipe(
      map(dividends => this.formatDate(dividends)),
      map(dividends => ({
        data: dividends,
        totalElements: dividends.length,
        totalPages: 1,
      })),
    );

    this.dividendSubscription = this.dividendData$.subscribe(dividends => this.source.load(dividends.data));
  }

  formatDate(dividends: any[]): any[] {
    return dividends.map(dividend => ({
      ...dividend,
      dueDate: this.displayFimsDate.transform(dividend.dueDate),
    }));
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.dividendSubscription.unsubscribe();
  }
}
