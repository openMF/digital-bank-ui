import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DELETE_FIELD } from '../../store/catalogs/catalog.actions';
import { Field } from '../../../../services/catalog/domain/field.model';
import { Store } from '@ngrx/store';
import * as fromCustomers from '../../store';
import { ActivatedRoute } from '@angular/router';
import { Catalog } from '../../../../services/catalog/domain/catalog.model';
import { DeleteDialogComponent } from '../../../common/delete-dialog/delete-dialog.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  templateUrl: './field.detail.component.html',
  styleUrls: ['./field.detail.component.scss'],
})
export class FieldDetailComponent {
  catalog$: Observable<Catalog>;

  field$: Observable<Field>;

  constructor(private store: Store<fromCustomers.State>, private dialogService: NbDialogService, private route: ActivatedRoute) {
    this.catalog$ = store.select(fromCustomers.getCustomerCatalog);
    this.field$ = store.select(fromCustomers.getSelectedField);
  }

  deleteField(catalogIdentifier: string, field: Field): void {
    this.dialogService
      .open(DeleteDialogComponent, {
        context: {
          title: 'field',
        },
      })
      .onClose.subscribe(value => {
        if (value) {
          this.store.dispatch({
            type: DELETE_FIELD,
            payload: {
              catalogIdentifier,
              field,
              activatedRoute: this.route,
            },
          });
        }
      });
  }
}
