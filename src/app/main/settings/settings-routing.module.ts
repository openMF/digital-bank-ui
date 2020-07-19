import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const routes: Routes = [{ path: '', component: ChangePasswordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
