import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OfficeComponent } from './office.component';

export const routes: Routes = [
  {
    path: '',
    component: OfficeComponent,
    data: { title: 'Manage Offices', hasPermission: { id: 'office_offices', accessLevel: 'READ' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficeRoutingModule {}
