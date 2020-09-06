import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OrdersChart, OrdersChartData } from '../data/orders-chart';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../data/orders-profit-chart';
import { ProfitChart, ProfitChartData } from '../data/profit-chart';

@Injectable()
export class OrdersProfitChartService extends OrdersProfitChartData {
  private summary = [
    {
      title: 'Active Members',
      value: 121,
    },
    {
      title: 'Deposit Accounts',
      value: 746,
    },
    {
      title: 'Credit Accounts',
      value: 357,
    },
    {
      title: 'Accounts At Risk',
      value: 12,
    },
  ];

  constructor(private ordersChartService: OrdersChartData, private profitChartService: ProfitChartData) {
    super();
  }

  getOrderProfitChartSummary(): Observable<OrderProfitChartSummary[]> {
    return observableOf(this.summary);
  }

  getOrdersChartData(period: string): Observable<OrdersChart> {
    return observableOf(this.ordersChartService.getOrdersChartData(period));
  }

  getProfitChartData(period: string): Observable<ProfitChart> {
    return observableOf(this.profitChartService.getProfitChartData(period));
  }
}
