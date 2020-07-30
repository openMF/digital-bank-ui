import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoleComponent } from './role.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleExistsGuard } from './role-exists.guard';
import { RoleCreateComponent } from './role-form/role-create/role-create.component';
import { RoleEditComponent } from './role-form/role-edit/role-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    data: { title: 'Manage roles and permissions', hasPermission: { id: 'identity_roles', accessLevel: 'READ' } },
  },
  {
    path: 'create',
    component: RoleCreateComponent,
    data: { title: 'Create new role', hasPermission: { id: 'identity_roles', accessLevel: 'CHANGE' } },
  },
  {
    path: 'detail/:id',
    component: RoleDetailComponent,
    canActivate: [RoleExistsGuard],
    data: { title: 'View role', hasPermission: { id: 'identity_roles', accessLevel: 'READ' } },
  },
  {
    path: 'detail/:id/edit',
    component: RoleEditComponent,
    canActivate: [RoleExistsGuard],
    data: { title: 'Edit role', hasPermission: { id: 'identity_roles', accessLevel: 'CHANGE' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule {}
