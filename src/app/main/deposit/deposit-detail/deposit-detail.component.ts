import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductDefinition } from '../../../services/depositAccount/domain/definition/product-definition.model';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromDepositAccounts from './../store';
import * as fromRoot from '../../../store';
import { DELETE, EXECUTE_COMMAND } from '../store/product.actions';
import { FimsPermission } from '../../../services/security/authz/fims-permission.model';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { SelectAction } from '../store/product.actions';
import { CustomRenderComponent } from '../helper/custom-render.component';

@Component({
  selector: 'ngx-deposit-detail',
  templateUrl: './deposit-detail.component.html',
  styleUrls: ['./deposit-detail.component.scss'],
})
export class DepositDetailComponent implements OnInit, OnDestroy {
  private actionsSubscription: Subscription;

  private productSubscription: Subscription;

  numberFormat = '1.2-2';

  definition: ProductDefinition;

  canDistributeDividends$: Observable<boolean>;

  source: LocalDataSource = new LocalDataSource();

  charges: any;

  /** Settings for smart-table */
  settings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      name: {
        title: 'Name',
      },
      description: {
        title: 'Description',
      },
      actionIdentifier: {
        title: 'Applied on',
      },
      proportional: {
        title: 'Proportional?',
        type: 'custom',
        renderComponent: CustomRenderComponent,
      },
      incomeAccountIdentifier: {
        title: 'Income account',
      },
      amount: {
        title: 'Amount',
      },
    },
    mode: 'external',
    pager: {
      display: false,
    },
  };

  constructor(private route: ActivatedRoute, private store: Store<fromDepositAccounts.State>, private dialogService: NbDialogService) {}

  ngOnInit(): void {
    this.actionsSubscription = this.route.params.pipe(map(params => new SelectAction(params['id']))).subscribe(this.store);

    const selectedProduct$ = this.store.select(fromDepositAccounts.getSelectedProduct).pipe(filter(product => !!product));

    this.productSubscription = selectedProduct$.subscribe(product => {
      this.definition = product;
      this.charges = {
        data: product.charges,
        totalElements: product.charges.length,
        totalPages: 1,
      };
      this.source.load(product.charges);
    });

    this.canDistributeDividends$ = combineLatest(selectedProduct$, this.store.select(fromRoot.getPermissions), (product, permissions) => ({
      isShareProduct: product.type === 'SHARE',
      hasPermission: this.hasChangePermission(permissions),
    })).pipe(map(result => result.isShareProduct && result.hasPermission));
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }

  deleteProduct() {
    this.dialogService
      .open(DeleteDialogComponent, {
        context: {
          title: 'product',
        },
      })
      .onClose.subscribe(value => {
        if (value) {
          this.store.dispatch({
            type: DELETE,
            payload: {
              productDefinition: this.definition,
              activatedRoute: this.route,
            },
          });
        }
      });
  }

  hasTerm(defininition: ProductDefinition): boolean {
    return !!defininition.term.timeUnit || !!defininition.term.period;
  }

  private hasChangePermission(permissions: FimsPermission[]): boolean {
    return permissions.filter(permission => permission.id === 'deposit_definitions' && permission.accessLevel === 'CHANGE').length > 0;
  }

  enableProduct(): void {
    this.store.dispatch({
      type: EXECUTE_COMMAND,
      payload: {
        definitionId: this.definition.identifier,
        command: {
          action: 'ACTIVATE',
        },
      },
    });
  }

  disableProduct(): void {
    this.store.dispatch({
      type: EXECUTE_COMMAND,
      payload: {
        definitionId: this.definition.identifier,
        command: {
          action: 'DEACTIVATE',
        },
      },
    });
  }
}
