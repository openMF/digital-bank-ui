import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CREATE } from '../../../store/dividends/dividend.actions';
import * as fromDepositAccounts from '../../../store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { DistributeDividendFormData } from './dividend-form.component';

@Component({
  templateUrl: './dividend-create.component.html',
})
export class CreateDividendFormComponent implements OnInit {
  productDefinitionId$: Observable<string>;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromDepositAccounts.State>) {}

  ngOnInit() {
    this.productDefinitionId$ = this.store.select(fromDepositAccounts.getSelectedProduct).pipe(
      filter(product => !!product),
      map(product => product.identifier),
    );
  }

  save(payload: DistributeDividendFormData): void {
    this.store.dispatch({
      type: CREATE,
      payload: {
        productDefinitionId: payload.productDefinitionId,
        dividendDistribution: {
          dueDate: payload.dueDate,
          dividendRate: payload.dividendRate,
        },
        activatedRoute: this.route,
      },
    });
  }

  cancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
