import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../../services/identity/domain/role.model';
import * as fromRoles from '../../store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectAction, UPDATE } from '../../store/role.actions';

@Component({
  selector: 'ngx-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss'],
})
export class RoleEditComponent implements OnInit, OnDestroy {
  private actionsSubscription: Subscription;
  private roleSubscription: Subscription;
  title: string = 'Edit role';
  role: Role;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromRoles.State>) {}

  ngOnInit(): void {
    this.actionsSubscription = this.route.params.pipe(map(params => new SelectAction(params['id']))).subscribe(this.store);

    this.roleSubscription = this.store.select(fromRoles.getSelectedRole).subscribe((role: Role) => {
      this.role = role;
    });
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
    this.roleSubscription.unsubscribe();
  }

  onSave(role: Role): void {
    this.store.dispatch({
      type: UPDATE,
      payload: {
        role,
        activatedRoute: this.route,
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
