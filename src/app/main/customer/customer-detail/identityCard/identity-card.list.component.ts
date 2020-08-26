import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as fromCustomers from '../../store/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LOAD_ALL } from '../../store/identityCards/identity-cards.actions';
import { IdentificationCard } from '../../../../services/customer/domain/identification-card.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  templateUrl: './identity-card.list.component.html',
  styleUrls: ['./identity-card.list.component.scss'],
})
export class CustomerIdentityCardListComponent implements OnInit, OnDestroy {
  private customerSubscription: Subscription;
  identityCardData$: Observable<any>;

  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  pageSizes: number[] = [5, 10, 15];
  perPage: number = this.pageSizes[0];

  /** Settings for smart-table */
  settings = {
    actions: false,
    columns: {
      number: {
        title: 'Number',
      },
      type: {
        title: 'Type',
      },
      issuer: {
        title: 'Issuer',
      },
    },
    mode: 'external',
  };

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromCustomers.State>) {}

  ngOnInit(): void {
    this.identityCardData$ = this.store.select(fromCustomers.getAllCustomerIdentificationCardEntities).pipe(
      map(entities => ({
        data: entities,
        totalElements: entities.length,
        totalPages: 1,
      })),
    );

    this.customerSubscription = this.store.select(fromCustomers.getSelectedCustomer).subscribe(customer => {
      this.store.dispatch({ type: LOAD_ALL, payload: customer.identifier });
    });

    this.identityCardData$.subscribe(data => this.setIdentityData(data));
  }

  setIdentityData(data: any) {
    this.source.load(data.data);
  }

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
  }

  rowSelect(event: any): void {
    const identificationCard: IdentificationCard = event.data;
    this.router.navigate(['detail', identificationCard.number], { relativeTo: this.route });
  }
}
