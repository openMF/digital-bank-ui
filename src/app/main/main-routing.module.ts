import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordGuard } from '../services/security/change.password.service';
import { AccessDeniedComponent } from './access.denied.component';
import { PermissionGuard } from '../services/security/authz/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivateChild: [ChangePasswordGuard, PermissionGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', loadChildren: () => import('./../user/user.module').then(m => m.UserModule) },
      { path: 'roles', loadChildren: () => import('./../roles/roles.module').then(m => m.RolesModule) },
      { path: 'denied', component: AccessDeniedComponent, data: { title: 'Not allowed' } },
    ],
  },
  {
    path: 'changePassword',
    loadChildren: () => import('./../user/user.module').then(m => m.UserModule),
    data: { title: 'Change password' },
  },
];

export const mainRoutingProviders: any[] = [ChangePasswordGuard, PermissionGuard];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
