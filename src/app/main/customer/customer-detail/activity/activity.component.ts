import { Component, OnDestroy, OnInit } from '@angular/core';
import { Command } from '../../../../services/customer/domain/command.model';
import { Store } from '@ngrx/store';
import { LOAD_ALL } from '../../store/commands/commands.actions';
import * as fromCustomers from '../../store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ngx-activity-display',
  templateUrl: './activity.component.html',
})
export class CustomerActivityComponent implements OnInit, OnDestroy {
  private commandsSubscription: Subscription;

  private customerSubscription: Subscription;

  commands: Command[];

  constructor(private store: Store<fromCustomers.State>) {}

  ngOnInit(): void {
    this.customerSubscription = this.store.select(fromCustomers.getSelectedCustomer).subscribe(customer => {
      this.store.dispatch({ type: LOAD_ALL, payload: customer.identifier });
    });

    this.commandsSubscription = this.store.select(fromCustomers.getAllCustomerCommands).subscribe(commands => (this.commands = commands));
  }

  ngOnDestroy(): void {
    this.commandsSubscription.unsubscribe();
    this.customerSubscription.unsubscribe();
  }
}
