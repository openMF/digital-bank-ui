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

export const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    data: { title: 'Manage Customers', hasPermission: { id: 'customer_customers', accessLevel: 'READ' } },
    canActivate: [CatalogExistsGuard],
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
