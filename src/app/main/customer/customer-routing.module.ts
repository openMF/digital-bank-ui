import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomerComponent } from './customer.component';
import { CatalogExistsGuard } from './custom-fields/catalog-exists.guard';
import { TaskListComponent } from './tasks/task.list.component';
import { TaskExistsGuard } from './tasks/task-exists.guard';
import { TaskEditFormComponent } from './tasks/form/edit.form.component';
import { TaskCreateFormComponent } from './tasks/form/create.form.component';
import { TaskIndexComponent } from './tasks/task.index.component';
import { TaskDetailComponent } from './tasks/task.detail.component';
import { CustomerIndexComponent } from './customer-detail/customer.index.component';
import { CustomerExistsGuard } from './customer-exists.guard';
import { CustomerStatusComponent } from './customer-detail/status/status.component';
import { CustomerDetailComponent } from './customer-detail/customer.detail.component';
import { CatalogDetailComponent } from './custom-fields/catalog.detail.component';
import { CreateCustomerCatalogFormComponent } from './custom-fields/form/create.form.component';
import { FieldIndexComponent } from './custom-fields/fields/field.index.component';
import { FieldExistsGuard } from './custom-fields/fields/field-exists.guard';
import { FieldDetailComponent } from './custom-fields/fields/field.detail.component';
import { EditCatalogFieldFormComponent } from './custom-fields/fields/form/edit.form.component';
import { CreateCustomerFormComponent } from './form/create/create.form.component';
import { EditCustomerFormComponent } from './form/edit/edit.form.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    data: { title: 'Manage Customers', hasPermission: { id: 'customer_customers', accessLevel: 'READ' } },
    canActivate: [CatalogExistsGuard],
  },
  {
    path: 'create',
    component: CreateCustomerFormComponent,
    data: { title: 'Create Customer', hasPermission: { id: 'customer_customers', accessLevel: 'CHANGE' } },
  },
  {
    path: 'detail/:id/edit',
    component: EditCustomerFormComponent,
    data: { title: 'Edit Customer', hasPermission: { id: 'customer_customers', accessLevel: 'CHANGE' } },
    canActivate: [CustomerExistsGuard],
  },
  {
    path: 'detail/:id',
    component: CustomerIndexComponent,
    data: {
      hasPermission: { id: 'customer_customers', accessLevel: 'READ' },
    },
    canActivate: [CustomerExistsGuard],
    children: [
      {
        path: '',
        component: CustomerDetailComponent,
        data: { title: 'View Customer' },
      },
      {
        path: 'tasks',
        component: CustomerStatusComponent,
        data: { title: 'Manage Customer Tasks' },
      },
      { path: 'identifications', loadChildren: './customer-detail/identityCard/identity-card.module#IdentityCardModule' },
      { path: 'loans', loadChildren: './cases/case.module#CaseModule' },
      { path: 'deposits', loadChildren: './deposits/deposits.module#DepositsModule' },
    ],
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    data: {
      title: 'Manage Tasks',
      hasPermission: { id: 'customer_tasks', accessLevel: 'READ' },
    },
  },
  {
    path: 'tasks/detail/:id',
    canActivate: [TaskExistsGuard],
    component: TaskIndexComponent,
    data: {
      title: 'View Task',
      hasPermission: { id: 'customer_tasks', accessLevel: 'READ' },
    },
    children: [
      {
        path: '',
        component: TaskDetailComponent,
      },
      {
        path: 'edit',
        component: TaskEditFormComponent,
        data: {
          title: 'Edit Task',
          hasPermission: { id: 'customer_tasks', accessLevel: 'CHANGE' },
        },
      },
    ],
  },
  {
    path: 'tasks/create',
    component: TaskCreateFormComponent,
    data: {
      title: 'Create Task',
      hasPermission: { id: 'customer_tasks', accessLevel: 'CHANGE' },
    },
  },
  {
    path: 'catalog/detail',
    data: {
      hasPermission: { id: 'catalog_catalogs', accessLevel: 'READ' },
    },
    children: [
      {
        path: '',
        component: CatalogDetailComponent,
      },
      {
        path: 'edit',
        component: CreateCustomerCatalogFormComponent,
        data: {
          hasPermission: { id: 'catalog_catalogs', accessLevel: 'CHANGE' },
        },
      },
      {
        path: 'field/detail/:fieldId',
        component: FieldIndexComponent,
        canActivate: [FieldExistsGuard],
        children: [
          {
            path: '',
            component: FieldDetailComponent,
          },
          {
            path: 'edit',
            component: EditCatalogFieldFormComponent,
            data: {
              hasPermission: { id: 'catalog_catalogs', accessLevel: 'CHANGE' },
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
