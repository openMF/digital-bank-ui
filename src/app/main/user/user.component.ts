/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

/** ngrx Store Imports */
import { Store } from '@ngrx/store';
import * as fromUsers from './store/index';
import { SEARCH } from './store/user.actions';

/**
 * Users component.
 */
@Component({
  selector: 'ngx-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  /** Users data */
  usersData: {
    users: any;
    totalPages: number;
    totalElements: number;
  };

  /** Loading property  */
  loading: any;

  /** Settings for smart-table */
  settings = {
    actions: false,
    columns: {
      identifier: {
        title: 'ID',
      },
      role: {
        title: 'Role',
      },
    },
    mode: 'external',
    pager: {
      display: false,
    },
  };

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromUsers.State>) {}

  /**
   * Dispatch search action.
   * Gets users search data.
   */
  ngOnInit(): void {
    this.store.dispatch({ type: SEARCH });
    this.store.select(fromUsers.getUserSearchLoading).subscribe(loading => (this.loading = loading));
    this.store.select(fromUsers.getUserSearchResults).subscribe(usersData => this.setUsersData(usersData));
  }

  /**
   * Initialise users data
   */
  setUsersData(usersData: any) {
    this.usersData = usersData;
    this.source.load(usersData.users);
  }

  /**
   * View user details
   */
  onUserRowSelect(event: any): void {
    const user = event.data;
    this.router.navigate(['detail', user.identifier], { relativeTo: this.route });
  }
}
