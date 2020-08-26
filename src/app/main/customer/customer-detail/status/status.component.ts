import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../../../../services/customer/domain/customer.model';
import { Command } from '../../../../services/customer/domain/command.model';
import { ActivatedRoute } from '@angular/router';
import * as fromCustomers from '../../store';
import { EXECUTE_COMMAND, EXECUTE_TASK, LOAD_ALL } from '../../store/customerTasks/customer-task.actions';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ProcessStep } from '../../../../services/customer/domain/process-step.model';
import { SelectTaskEvent } from './customer-task.component';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './status.component.html',
})
export class CustomerStatusComponent implements OnInit, OnDestroy {
  private customerSubscription: Subscription;

  customer: Customer;

  processSteps$: Observable<ProcessStep[]>;

  constructor(private route: ActivatedRoute, private store: Store<fromCustomers.State>) {}

  ngOnInit(): void {
    this.processSteps$ = this.store.select(fromCustomers.getCustomerTaskProcessSteps);

    this.customerSubscription = this.store
      .select(fromCustomers.getSelectedCustomer)
      .pipe(tap(customer => this.store.dispatch({ type: LOAD_ALL, payload: customer.identifier })))
      .subscribe(customer => (this.customer = customer));
  }

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
  }

  executeTask(event: SelectTaskEvent): void {
    this.store.dispatch({
      type: EXECUTE_TASK,
      payload: {
        customerId: this.customer.identifier,
        taskId: event.taskIdentifier,
      },
    });
  }

  executeCommand(command: Command): void {
    this.store.dispatch({
      type: EXECUTE_COMMAND,
      payload: {
        customerId: this.customer.identifier,
        command,
        activatedRoute: this.route,
      },
    });
  }
}
