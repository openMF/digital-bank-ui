import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectAction } from '../store/customer.actions';
import * as fromCustomers from '../store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './customer.index.component.html',
})
export class CustomerIndexComponent implements OnInit, OnDestroy {
  private actionsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private customersStore: Store<fromCustomers.State>) {}

  ngOnInit(): void {
    this.actionsSubscription = this.route.params.pipe(map(params => new SelectAction(params['id']))).subscribe(this.customersStore);
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }
}
