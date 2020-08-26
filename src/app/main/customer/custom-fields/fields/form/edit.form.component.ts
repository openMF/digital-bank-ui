import { Component } from '@angular/core';
import * as fromCustomers from '../../../store/index';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Field } from '../../../../../services/catalog/domain/field.model';
import { UPDATE_FIELD } from '../../../store/catalogs/catalog.actions';
import { Catalog } from '../../../../../services/catalog/domain/catalog.model';

@Component({
  templateUrl: './edit.form.component.html',
})
export class EditCatalogFieldFormComponent {
  catalog$: Observable<Catalog>;

  field$: Observable<Field>;

  constructor(private store: Store<fromCustomers.State>, private router: Router, private route: ActivatedRoute) {
    this.catalog$ = store.select(fromCustomers.getCustomerCatalog);
    this.field$ = store.select(fromCustomers.getSelectedField);
  }

  onSave(catalogIdentifier: string, field: Field): void {
    this.store.dispatch({
      type: UPDATE_FIELD,
      payload: {
        catalogIdentifier,
        field,
        activatedRoute: this.route,
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
