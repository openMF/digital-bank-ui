import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DepositComponent } from './deposit.component';
import { DepositCreateComponent } from './deposit-form/deposit-create/deposit-create.component';
import { ProductDefinitionExistsGuard } from './product-definition-exists.guard';
import { DepositDetailComponent } from './deposit-detail/deposit-detail.component';
import { DividendsComponent } from './deposit-detail/dividends/dividends.component';
import { CreateDividendFormComponent } from './deposit-detail/dividends/dividend-form/dividend-create.component';
import { DepositEditComponent } from './deposit-form/deposit-edit/deposit-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: DepositComponent,
    data: { title: 'Manage deposit products', hasPermission: { id: 'deposit_definitions', accessLevel: 'READ' } },
  },
  {
    path: 'create',
    component: DepositCreateComponent,
    data: { hasPermission: { id: 'deposit_definitions', accessLevel: 'CHANGE' } },
  },
  {
    path: 'detail/:id',
    component: DepositDetailComponent,
    canActivate: [ProductDefinitionExistsGuard],
    data: { hasPermission: { id: 'deposit_definitions', accessLevel: 'READ' } },
  },
  {
    path: 'detail/:id/edit',
    component: DepositEditComponent,
    canActivate: [ProductDefinitionExistsGuard],
    data: { hasPermission: { id: 'deposit_definitions', accessLevel: 'CHANGE' } },
  },
  {
    path: 'detail/:id/dividends',
    component: DividendsComponent,
    canActivate: [ProductDefinitionExistsGuard],
    data: { hasPermission: { id: 'deposit_definitions', accessLevel: 'READ' } },
  },
  {
    path: 'detail/:id/dividends/distribute',
    component: CreateDividendFormComponent,
    canActivate: [ProductDefinitionExistsGuard],
    data: { hasPermission: { id: 'deposit_definitions', accessLevel: 'CHANGE' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositRoutingModule {}
