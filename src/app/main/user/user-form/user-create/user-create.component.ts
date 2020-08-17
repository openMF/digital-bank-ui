import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Error } from '../../../../services/domain/error.model';
import { CREATE, RESET_FORM } from '../../store/user.actions';

/** ngrx Store Imports */
import { Store } from '@ngrx/store';
import * as fromUsers from '../../store';
import { filter } from 'rxjs/operators';

import { UserFormComponent } from '../user-form.component';
import { UserWithPassword } from '../../../../services/identity/domain/user-with-password.model';
import { User } from '../../../../services/identity/domain/user.model';

@Component({
  selector: 'ngx-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit, OnDestroy {
  private formStateSubscription: Subscription;

  @ViewChild('form') formComponent: UserFormComponent;

  user: User = { identifier: '', role: '' };

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromUsers.State>) {}

  ngOnInit(): void {
    this.formStateSubscription = this.store
      .select(fromUsers.getUserFormError)
      .pipe(filter((error: Error) => !!error))
      .subscribe((error: Error) => {
        const detailForm = this.formComponent.detailForm;
        const errors = detailForm.get('identifier').errors || {};
        errors['unique'] = true;
        detailForm.get('identifier').setErrors(errors);
      });
  }

  ngOnDestroy(): void {
    this.formStateSubscription.unsubscribe();
    this.store.dispatch({ type: RESET_FORM });
  }

  onSave(user: UserWithPassword): void {
    this.store.dispatch({
      type: CREATE,
      payload: {
        user,
        activatedRoute: this.route,
      },
    });
  }

  onCancel(): void {
    this.navigateAway();
  }

  navigateAway(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
