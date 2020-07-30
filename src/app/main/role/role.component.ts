/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

/** ngrx Store Imports */
import { Store } from '@ngrx/store';
import * as fromRoles from './store/index';
import { SEARCH } from './store/role.actions';

/**
 * Roles component.
 */
@Component({
  selector: 'ngx-roles',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  /** Roles data */
  rolesData: {
    roles: any;
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
    },
    mode: 'external',
    pager: {
      display: false,
    },
  };

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromRoles.State>) {}

  /**
   * Dispatch search action.
   * Gets roles search data.
   */
  ngOnInit(): void {
    this.store.dispatch({ type: SEARCH });
    this.store.select(fromRoles.getRoleSearchLoading).subscribe(loading => (this.loading = loading));
    this.store.select(fromRoles.getRoleSearchResults).subscribe(rolesData => this.setRolesData(rolesData));
  }

  /**
   * Initialise roles data
   */
  setRolesData(rolesData: any) {
    this.rolesData = rolesData;
    this.source.load(rolesData.roles);
  }

  /**
   * View role details
   */
  onRoleRowSelect(event: any): void {
    const role = event.data;
    this.router.navigate(['detail', role.identifier], { relativeTo: this.route });
  }
}
