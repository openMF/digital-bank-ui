import { Component } from '@angular/core';
import { Catalog } from '../../../services/catalog/domain/catalog.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromCustomers from '../store';
import { DELETE } from '../store/catalogs/catalog.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  templateUrl: './catalog.detail.component.html',
  styleUrls: ['./catalog.detail.component.scss'],
})
export class CatalogDetailComponent {
  catalog$: Observable<Catalog>;

  fieldData$: Observable<any>;

  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  pageSizes: number[] = [5, 10, 15];
  perPage: number = this.pageSizes[0];

  /** Settings for smart-table */
  settings = {
    actions: false,
    columns: {
      identifier: {
        title: 'ID',
      },
      dataType: {
        title: 'Data type',
      },
      label: {
        title: 'Label',
      },
      hint: {
        title: 'Hint',
      },
      description: {
        title: 'Description',
      },
      mandatory: {
        title: 'Mandatory',
      },
    },
    mode: 'external',
  };

  constructor(
    private store: Store<fromCustomers.State>,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.catalog$ = store.select(fromCustomers.getCustomerCatalog).pipe(filter(catalog => !!catalog));

    this.fieldData$ = this.catalog$.pipe(
      map(catalog => ({
        data: catalog.fields,
        totalElements: catalog.fields.length,
        totalPages: 1,
      })),
    );

    this.fieldData$.subscribe(fieldData => this.setFieldData(fieldData));
  }

  setFieldData(fieldData: any) {
    this.source.load(fieldData.data);
  }

  rowSelect(event: any): void {
    const field = event.data;
    this.router.navigate(['field/detail', field.identifier], { relativeTo: this.route });
  }

  deleteCatalog(catalog: Catalog): void {
    this.dialogService
      .open(DeleteDialogComponent, {
        context: {
          title: 'catalog',
        },
      })
      .onClose.subscribe(value => {
        if (value) {
          this.store.dispatch({
            type: DELETE,
            payload: {
              catalog,
              activatedRoute: this.route,
            },
          });
        }
      });
  }
}
