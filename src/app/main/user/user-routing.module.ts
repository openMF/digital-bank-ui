import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserCreateComponent } from './user-form/user-create/user-create.component';
import { UserEditComponent } from './user-form/user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserExistsGuard } from './user-exists.guard';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: { title: 'Users', hasPermission: { id: 'identity_identities', accessLevel: 'READ' } },
  },
  {
    path: 'create',
    component: UserCreateComponent,
    data: { title: 'Create new user', hasPermission: { id: 'identity_identities', accessLevel: 'CHANGE' } },
  },
  {
    path: 'detail/:id',
    component: UserDetailComponent,
    canActivate: [UserExistsGuard],
    data: { title: 'View user', hasPermission: { id: 'identity_identities', accessLevel: 'READ' } },
  },
  {
    path: 'detail/:id/edit',
    component: UserEditComponent,
    canActivate: [UserExistsGuard],
    data: { title: 'Edit user', hasPermission: { id: 'identity_identities', accessLevel: 'CHANGE' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
