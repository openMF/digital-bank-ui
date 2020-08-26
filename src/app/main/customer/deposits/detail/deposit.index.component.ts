import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SelectAction } from '../store/deposit.actions';
import { map } from 'rxjs/operators';
import * as fromDeposits from '../store/index';

@Component({
  templateUrl: './deposit.index.component.html',
})
export class DepositIndexComponent implements OnInit, OnDestroy {
  private actionsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<fromDeposits.State>) {}

  ngOnInit(): void {
    this.actionsSubscription = this.route.params.pipe(map(params => new SelectAction(params['id']))).subscribe(this.store);
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }
}
