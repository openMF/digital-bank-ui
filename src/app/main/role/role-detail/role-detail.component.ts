/** Angular Imports */
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/** rxjs Imports */
import { Subscription, Observable, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/** ngrx Store Imports */
import { Store } from '@ngrx/store';
import * as fromRoles from '../store';

/** Nebular Theme Imports */
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbDialogService } from '@nebular/theme';

/** Custom imports */
import { Role } from '../../../services/identity/domain/role.model';
import { DELETE, SelectAction } from '../store/role.actions';
import { IdentityService } from '../../../services/identity/identity.service';
import { PermittableGroup } from '../../../services/anubis/permittable-group.model';
import { FormPermissionService } from '../helper/form-permission.service';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';

interface PermissionObject<T> {
  data: T;
  children?: PermissionObject<T>[];
  expanded?: boolean;
}

interface PermissionValues {
  name: string;
  kind?: string;
  read?: boolean;
  change?: boolean;
  delete?: boolean;
}

/**
 * Role Detail Component.
 */
@Component({
  selector: 'ngx-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss'],
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  private actionsSubscription: Subscription;
  role$: Observable<Role>;
  role: Role;

  /**
   * Table Settings.
   */
  customColumn = 'name';
  defaultColumns = ['read', 'change', 'delete'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<PermissionValues>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: PermissionObject<PermissionValues>[] = [];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }

  constructor(
    private route: ActivatedRoute,
    private identityService: IdentityService,
    private store: Store<fromRoles.State>,
    private formPermissionService: FormPermissionService,
    private dialogService: NbDialogService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<PermissionValues>,
  ) {}

  ngOnInit(): void {
    this.actionsSubscription = this.route.params.pipe(map(params => new SelectAction(params['id']))).subscribe(this.store);

    this.role$ = this.store.select(fromRoles.getSelectedRole).pipe(filter(role => !!role));

    combineLatest(this.identityService.getPermittableGroups(), this.role$, (groups: PermittableGroup[], role: Role) =>
      this.formPermissionService.mapToFormPermissions(groups, role.permissions),
    ).subscribe(permissionGroupData => this.setTreeData(permissionGroupData));

    this.role$.subscribe(role => (this.role = role));
  }

  /**
   * Builds and sets tree data.
   */
  setTreeData(permissionGroupData: any) {
    for (const group of permissionGroupData) {
      const data: PermissionValues = {
        name: group.groupId,
        kind: 'dir',
      };
      const groupData: PermissionObject<any> = {
        data: data,
        children: [],
      };
      const childrenData: PermissionObject<any>[] = [];
      for (const permission of group.formPermissions) {
        const permissionValues: PermissionValues = {
          name: permission.label,
          read: permission.read,
          change: permission.change,
          delete: permission.remove,
        };

        childrenData.push({ data: permissionValues });
      }
      groupData.children = childrenData;
      this.data.push(groupData);
    }
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  deleteRole() {
    const role = this.role;
    this.dialogService
      .open(DeleteDialogComponent, {
        context: {
          title: 'role',
        },
      })
      .onClose.subscribe(value => {
        if (value) {
          this.store.dispatch({
            type: DELETE,
            payload: {
              role,
              activatedRoute: this.route,
            },
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir()"> </nb-tree-grid-row-toggle>
    <div *ngIf="cellData && isCell">
      <nb-icon icon="checkmark-circle-2" status="basic"></nb-icon>
    </div>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;
  @Input() cellData: boolean;
  @Input() isCell: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
