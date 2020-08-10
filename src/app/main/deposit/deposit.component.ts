/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

/** ngrx Store Imports */
import { Store } from '@ngrx/store';
import * as fromDepositAccounts from './store/index';
import { SEARCH } from './store/product.actions';
import { CustomSelectorFilterComponent } from './helper/custom-filter.component';
import { CustomNumberFilterComponent } from '../common/custom-filters/custom-number-filter.component';
import { CustomRenderComponent } from './helper/custom-render.component';

/**
 * Deposit product component.
 */
@Component({
  selector: 'ngx-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  /** Deposit Product data */
  productsData: {
    products: any;
    totalPages: number;
    totalElements: number;
  };

  /** Loading property  */
  loading: any;

  /** Settings for smart-table */
  settings = {
    actions: false,
    columns: {
      identifier: {
        title: 'ID',
      },
      name: {
        title: 'Name',
      },
      type: {
        title: 'Type',
        filter: {
          type: 'custom',
          component: CustomSelectorFilterComponent,
        },
      },
      active: {
        title: 'Enabled',
        filter: false,
        type: 'custom',
        renderComponent: CustomRenderComponent,
      },
      interest: {
        title: 'Interest',
        filter: {
          type: 'custom',
          component: CustomNumberFilterComponent,
        },
      },
    },
    mode: 'external',
    pager: {
      display: false,
    },
  };

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromDepositAccounts.State>) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.store.select(fromDepositAccounts.getProductSearchResults).subscribe(productsData => this.setProductsData(productsData));
  }

  setProductsData(productsData: any) {
    this.productsData = productsData;
    this.source.load(productsData.products);
  }

  fetchProducts(): void {
    this.store.dispatch({ type: SEARCH });
  }

  /**
   * View product details
   */
  onProductRowSelect(event: any): void {
    const product = event.data;
    this.router.navigate(['detail', product.identifier], { relativeTo: this.route });
  }
}
