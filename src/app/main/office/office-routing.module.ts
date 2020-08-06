import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OfficeComponent } from './office.component';
import { HeadquarterGuard } from './headquarter/headquarter.guard';
import { HeadquarterNotFoundComponent } from './headquarter/headquarter-not-found.component';
import { OfficeExistsGuard } from './office-exists.guard';
import { OfficeIndexComponent } from './office-detail/office.index.component';
import { CreateOfficeFormComponent } from './office-form/office-create/office-create.component';
import { OfficeDetailComponent } from './office-detail/office-detail.component';
import { EditOfficeFormComponent } from './office-form/office-edit/office-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: OfficeComponent,
    canActivate: [HeadquarterGuard],
    data: {
      title: 'Manage offices',
      hasPermission: { id: 'office_offices', accessLevel: 'READ' },
    },
  },
  {
    path: 'hqNotFound',
    component: HeadquarterNotFoundComponent,
    data: { title: 'Headquarter not found' },
  },
  {
    path: 'create',
    component: CreateOfficeFormComponent,
    data: { title: 'Create office', hasPermission: { id: 'office_offices', accessLevel: 'CHANGE' } },
  },
  {
    path: 'detail/:id',
    component: OfficeIndexComponent,
    canActivate: [OfficeExistsGuard],
    children: [
      {
        path: '',
        component: OfficeDetailComponent,
        data: { title: 'View office', hasPermission: { id: 'office_offices', accessLevel: 'READ' } },
      },
      {
        path: 'edit',
        component: EditOfficeFormComponent,
        data: { title: 'Edit office', hasPermission: { id: 'office_offices', accessLevel: 'CHANGE' } },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficeRoutingModule {}
