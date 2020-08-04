import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectAction, UPDATE } from '../../store/user.actions';

/** ngrx Store Imports */
import { Store } from '@ngrx/store';
import * as fromUsers from '../../store';

import { map } from 'rxjs/operators';
import { User } from '../../../../services/identity/domain/user.model';

@Component({
  selector: 'ngx-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  private actionsSubscription: Subscription;
  private userSubscription: Subscription;
  title: string = 'Edit user';
  user: User;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromUsers.State>) {}

  ngOnInit() {
    this.actionsSubscription = this.route.params.pipe(map(params => new SelectAction(params['id']))).subscribe(this.store);

    this.userSubscription = this.store.select(fromUsers.getSelectedUser).subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  onSave(user: any): void {
    this.store.dispatch({
      type: UPDATE,
      payload: {
        ...user,
        activatedRoute: this.route,
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
