import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Error } from '../../../../services/domain/error.model';
import { Role } from '../../../../services/identity/domain/role.model';
import { CREATE, RESET_FORM } from '../../store/role.actions';
/** ngrx Store Imports */
import { Store } from '@ngrx/store';
import * as fromRoles from '../../store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss'],
})
export class RoleCreateComponent implements OnInit, OnDestroy {
  private formStateSubscription: Subscription;

  role: Role = { identifier: '', permissions: [] };
  title: string = 'Create new role';

  @ViewChild('form') formComponent: any;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromRoles.State>) {}

  ngOnInit(): void {
    this.formStateSubscription = this.store
      .select(fromRoles.getRoleFormError)
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

  onSave(role: Role): void {
    this.store.dispatch({
      type: CREATE,
      payload: {
        role,
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
