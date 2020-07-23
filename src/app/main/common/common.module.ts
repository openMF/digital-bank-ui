import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionDirective } from '../../services/security/authz/permission.directive';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbInputModule,
  NbIconModule,
} from '@nebular/theme';
import { IdInputComponent } from './id-input/id-input.component';

@NgModule({
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, NbEvaIconsModule, NbButtonModule, NbIconModule, NbInputModule],
  declarations: [PermissionDirective, FabButtonComponent, IdInputComponent],
  exports: [PermissionDirective, FabButtonComponent, IdInputComponent],
  entryComponents: [],
})
export class SharedModule {}
