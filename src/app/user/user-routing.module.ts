import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PasswordComponent } from './password.component';

export const routes: Routes = [{ path: '', component: PasswordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
