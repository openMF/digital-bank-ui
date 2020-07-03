import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionDirective } from '../services/security/authz/permission.directive';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [PermissionDirective],
  exports: [PermissionDirective],
  entryComponents: [],
})
export class FimsSharedModule {}
