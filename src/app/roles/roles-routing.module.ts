import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RolesComponent } from './roles.component';

export const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    // data: {title: 'Manage roles and permissions', hasPermission: {id: 'identity_roles', accessLevel: 'READ'}}
  },
  // {
  //   path: 'create',
  //   component: CreateRoleFormComponent,
  //   data: {title: 'Create new role', hasPermission: {id: 'identity_roles', accessLevel: 'CHANGE'}}
  // },
  // {
  //   path: 'detail/:id',
  //   component: RoleDetailComponent,
  //   canActivate: [RoleExistsGuard],
  //   data: {title: 'View role', hasPermission: {id: 'identity_roles', accessLevel: 'READ'}}
  // },
  // {
  //   path: 'detail/:id/edit',
  //   component: EditRoleFormComponent,
  //   canActivate: [RoleExistsGuard],
  //   data: {title: 'Edit role', hasPermission: {id: 'identity_roles', accessLevel: 'CHANGE'}}
  // }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
