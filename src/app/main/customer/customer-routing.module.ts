import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomerComponent } from './customer.component';
import { CatalogExistsGuard } from './custom-fields/catalog-exists.guard';

export const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    data: { title: 'Manage Customers', hasPermission: { id: 'customer_customers', accessLevel: 'READ' } },
    canActivate: [CatalogExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
