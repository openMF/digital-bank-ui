import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromCustomers from '../../store/index';
import { SelectAction } from '../../store/identityCards/identity-cards.actions';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './identity-card.index.component.html',
})
export class CustomerIdentityCardIndexComponent implements OnInit, OnDestroy {
  private actionsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private customersStore: Store<fromCustomers.State>) {}

  ngOnInit(): void {
    this.actionsSubscription = this.route.params.pipe(map(params => new SelectAction(params['number']))).subscribe(this.customersStore);
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }
}
