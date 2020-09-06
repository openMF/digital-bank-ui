import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { UserActive, UserActivityData } from '../data/user-activity';

@Injectable()
export class UserActivityService extends UserActivityData {
  private getRandom = (roundTo: number) => Math.round(Math.random() * roundTo);
  private generateUserActivityRandomData(date) {
    return {
      date,
      pagesVisitCount: this.getRandom(1000),
      deltaUp: this.getRandom(1) % 2 === 0,
      newVisits: this.getRandom(100),
      type: ['deposit', 'withdraw'],
    };
  }

  data = {};

  constructor() {
    super();
    this.data = {
      week: this.getDataWeek(),
      month: this.getDataMonth(),
      year: this.getDataYear(),
    };
  }

  private getDataWeek(): UserActive[] {
    const data = ['2020-09-07', '2020-09-05', '2020-09-04', '2020-09-03', '2020-09-01'];
    return data.map(week => {
      return this.generateUserActivityRandomData(week);
    });
  }

  private getDataMonth(): UserActive[] {
    const data = ['2020-09-07', '2020-09-05', '2020-09-04', '2020-09-03', '2020-09-01'];
    return data.map(week => {
      return this.generateUserActivityRandomData(week);
    });
  }

  private getDataYear(): UserActive[] {
    const data = [
      '2020-09-07',
      '2020-09-05',
      '2020-09-04',
      '2020-09-03',
      '2020-09-01',
      '2020-08-26',
      '2020-08-24',
      '2020-08-17',
      '2020-08-15',
      '2020-08-12',
      '2020-08-07',
      '2020-07-10',
      '2020-07-09',
      '2020-07-07',
      '2020-06-17',
      '2020-06-15',
      '2020-03-12',
      '2020-02-08',
      '2020-01-12',
      '2020-01-07',
    ];
    return data.map(year => {
      return this.generateUserActivityRandomData(year);
    });
  }

  getUserActivityData(period: string): Observable<UserActive[]> {
    return observableOf(this.data[period]);
  }
}
