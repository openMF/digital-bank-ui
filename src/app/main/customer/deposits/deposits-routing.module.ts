import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositCreateComponent } from './form/create.component';
import { DepositIndexComponent } from './detail/deposit.index.component';
import { DepositDetailComponent } from './detail/deposit.detail.component';
import { DepositInstanceExistsGuard } from './deposit-instance-exists.guard';
import { DepositEditComponent } from './form/edit.component';

export const routes: Routes = [
  {
    path: 'deposit/detail/:id',
    component: DepositIndexComponent,
    canActivate: [DepositInstanceExistsGuard],
    data: {
      hasPermission: { id: 'deposit_instances', accessLevel: 'READ' },
    },
    children: [
      {
        path: '',
        component: DepositDetailComponent,
      },
      {
        path: 'edit',
        component: DepositEditComponent,
        data: {
          hasPermission: { id: 'deposit_instances', accessLevel: 'CHANGE' },
        },
      },
    ],
  },
  {
    path: 'deposit/create',
    component: DepositCreateComponent,
    data: {
      hasPermission: { id: 'deposit_instances', accessLevel: 'CHANGE' },
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositRoutingModule {}
