import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordGuard } from '../services/security/change.password.service';
import { AccessDeniedComponent } from './access-denied/access.denied.component';
import { PermissionGuard } from '../services/security/authz/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivateChild: [ChangePasswordGuard, PermissionGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
      { path: 'offices', loadChildren: () => import('./office/office.module').then(m => m.OfficeModule) },
      { path: 'roles', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
      { path: 'deposits', loadChildren: () => import('./deposit/deposit.module').then(m => m.DepositModule) },
      { path: 'customers', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
      { path: 'denied', component: AccessDeniedComponent, data: { title: 'Not allowed' } },
    ],
  },
  {
    path: 'changePassword',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    data: { title: 'Change password' },
  },
];

export const mainRoutingProviders: any[] = [ChangePasswordGuard, PermissionGuard];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
