import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { OfficeService } from '../../../services/office/office.service';
import { Office } from '../../../services/office/domain/office.model';
import { FetchRequest } from '../../../services/domain/paging/fetch-request.model';
import { OfficePage } from '../../../services/office/domain/office-page.model';
import { DELETE } from '../store/office.actions';
import { Store } from '@ngrx/store';
import { getSelectedOffice } from '../store/index';
import { FimsPermission } from '../../../services/security/authz/fims-permission.model';
import * as fromRoot from '../../../store/index';
import * as fromOffices from '../store/index';
import { FimsValidators } from '../../common/validator/validators';
import { LocalDataSource } from 'ng2-smart-table';
import { Page } from '../../../services/domain/paging/page.model';
import { Sort } from '../../../services/domain/paging/sort.model';
import { tap, map, filter } from 'rxjs/operators';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.scss'],
})
export class OfficeDetailComponent implements OnInit {
  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  pageSizes: number[] = [10, 15, 20];

  private currentPage: Page = {
    pageIndex: 0,
    size: this.pageSizes[0],
  };

  private currentSort: Sort = {
    sortColumn: 'identifier',
    sortDirection: 'ASC',
  };

  /** Branch data */
  branchData: any = {
    totalElements: 0,
    totalPages: 0,
    data: [],
  };

  /** Settings for smart-table */
  settings = {
    actions: false,
    columns: {
      identifier: {
        title: 'ID',
        compareFunction: FimsValidators.compareFunction,
      },
      name: {
        title: 'Name',
        compareFunction: FimsValidators.compareFunction,
      },
      description: {
        title: 'Description',
        compareFunction: FimsValidators.compareFunction,
      },
    },
    mode: 'external',
    pager: {
      display: false,
    },
  };

  searchTerm: string;

  lastFetchRequest: FetchRequest = {
    searchTerm: '',
    page: {
      pageIndex: 0,
      size: 10,
    },
    sort: {
      sortColumn: '',
      sortDirection: '',
    },
  };

  office$: Observable<Office>;
  office: Office;

  canDelete$: Observable<boolean>;

  constructor(
    private store: Store<fromOffices.State>,
    private route: ActivatedRoute,
    private router: Router,
    private officeService: OfficeService,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.office$ = this.store.select(getSelectedOffice).pipe(
      filter(office => !!office),
      tap(office => this.fetchBranches(office.identifier)),
    );

    this.office$.subscribe(officeData => {
      this.office = officeData;
    });

    this.canDelete$ = combineLatest(this.store.select(fromRoot.getPermissions), this.office$, (permissions, office: Office) => ({
      hasPermission: this.hasDeletePermission(permissions),
      noExternalReferences: !office.externalReferences,
    })).pipe(map(result => result.hasPermission && result.noExternalReferences));

    this.source.onChanged().subscribe(change => {
      if (change.action === 'sort') {
        const sortField = change.sort[0].field;
        const sortDirection = change.sort[0].direction;
        this.sortChanged(sortDirection, sortField);
      }
    });
  }

  fetchBranches(identifier: string, fetchRequest?: FetchRequest): void {
    this.officeService.listBranches(identifier, fetchRequest).subscribe((officePage: OfficePage) => {
      this.branchData = {
        data: officePage.offices,
        totalElements: officePage.totalElements,
        totalPages: officePage.totalPages,
      };
      this.loadDatatoTable(officePage.offices);
    });
  }

  loadDatatoTable(branchData: any) {
    this.source.load(branchData);
  }

  /** Paging and sort events  */
  page(pagingEvent: any): void {
    this.currentPage = {
      pageIndex: pagingEvent.page - 1,
      size: pagingEvent.pageSize,
    };
    this.fetch();
  }

  sortChanged(sortDirection: string, sortColumn: string): void {
    sortDirection = sortDirection.toUpperCase();
    this.currentSort = {
      sortDirection: sortDirection,
      sortColumn: sortColumn,
    };
    this.fetch();
  }

  private fetch() {
    const fetchRequest: FetchRequest = {
      page: this.currentPage,
      sort: this.currentSort,
    };
    this.fetchBranches(this.office.identifier, fetchRequest);
  }

  rowSelect(event: any): void {
    const office = event.data;
    this.router.navigate(['../../', office.identifier], { relativeTo: this.route });
  }

  searchOffice(event: any): void {
    const searchTerm = event.target.value;
    this.router.navigate(['../../../'], { queryParams: { term: searchTerm }, relativeTo: this.route });
  }

  private hasDeletePermission(permissions: FimsPermission[]): boolean {
    return permissions.filter(permission => permission.id === 'office_offices' && permission.accessLevel === 'DELETE').length > 0;
  }

  deleteOffice(): void {
    const office: Office = this.office;

    this.dialogService
      .open(DeleteDialogComponent, {
        context: {
          title: 'office',
        },
      })
      .onClose.subscribe(value => {
        if (value) {
          this.store.dispatch({
            type: DELETE,
            payload: {
              office,
              activatedRoute: this.route,
            },
          });
        }
      });
  }
}
