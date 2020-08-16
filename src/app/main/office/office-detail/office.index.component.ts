import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectAction } from '../store/office.actions';
import { Store } from '@ngrx/store';
import * as fromOffices from '../store/index';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './office.index.component.html',
})
export class OfficeIndexComponent implements OnInit, OnDestroy {
  private actionsSubscription: Subscription;

  constructor(private store: Store<fromOffices.State>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.actionsSubscription = this.route.params.pipe(map(params => new SelectAction(params['id']))).subscribe(this.store);
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }
}
