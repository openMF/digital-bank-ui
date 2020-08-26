import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalog } from '../../../../services/catalog/domain/catalog.model';
import { CREATE } from '../../store/catalogs/catalog.actions';
import * as fromCustomers from '../../store';

@Component({
  templateUrl: './create.form.component.html',
})
export class CreateCustomerCatalogFormComponent {
  catalog: Catalog = {
    identifier: 'customers',
    name: '',
    fields: [],
  };

  constructor(private store: Store<fromCustomers.State>, private router: Router, private route: ActivatedRoute) {}

  onSave(catalog: Catalog): void {
    this.store.dispatch({
      type: CREATE,
      payload: {
        catalog,
        activatedRoute: this.route,
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
