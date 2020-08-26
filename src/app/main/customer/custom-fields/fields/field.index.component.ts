import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCustomers from '../../store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SelectFieldAction } from '../../store/catalogs/catalog.actions';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './field.index.component.html',
})
export class FieldIndexComponent implements OnInit, OnDestroy {
  private actionsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<fromCustomers.State>) {}

  ngOnInit(): void {
    this.actionsSubscription = this.route.params.pipe(map(params => new SelectFieldAction(params['fieldId']))).subscribe(this.store);
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }
}
