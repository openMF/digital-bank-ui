/** Angular Imports */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/** rxjs Imports */
import { Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/** ngrx Store Imports */
import { Store } from '@ngrx/store';
import * as fromUsers from '../store';
import { SelectAction } from '../store/user.actions';

/** Custom imports */
import { User } from '../../../services/identity/domain/user.model';

/**
 * User Detail Component.
 */
@Component({
  selector: 'ngx-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  private actionsSubscription: Subscription;
  user$: Observable<User>;
  user: User;

  constructor(private route: ActivatedRoute, private store: Store<fromUsers.State>, private router: Router) {}

  ngOnInit(): void {
    this.actionsSubscription = this.route.params.pipe(map(params => new SelectAction(params['id']))).subscribe(this.store);

    this.user$ = this.store.select(fromUsers.getSelectedUser).pipe(filter(user => !!user));

    this.user$.subscribe(user => (this.user = user));
  }

  onRoleClick(): void {
    this.router.navigate(['/roles/detail/' + this.user.role]);
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }
}
