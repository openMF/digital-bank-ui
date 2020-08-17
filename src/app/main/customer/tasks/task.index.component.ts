import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectAction } from '../store/tasks/task.actions';
import { Store } from '@ngrx/store';
import * as fromCustomers from '../store';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './task.index.component.html',
})
export class TaskIndexComponent implements OnInit, OnDestroy {
  private actionsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private customersStore: Store<fromCustomers.State>) {}

  ngOnInit(): void {
    this.actionsSubscription = this.route.params.pipe(map(params => new SelectAction(params['id']))).subscribe(this.customersStore);
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }
}
