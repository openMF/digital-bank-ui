import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionDirective } from '../../services/security/authz/permission.directive';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
  NbInputModule,
  NbDialogModule,
  NbTreeGridModule,
  NbIconModule,
  NbCheckboxModule,
  NbListModule,
} from '@nebular/theme';
import { IdInputComponent } from './id-input/id-input.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbLayoutModule,
    NbInputModule,
    NbCheckboxModule,
    NbListModule,
    NbTreeGridModule,
    NbDialogModule.forChild(),
  ],
  declarations: [PermissionDirective, FabButtonComponent, IdInputComponent, DeleteDialogComponent],
  exports: [PermissionDirective, FabButtonComponent, IdInputComponent, DeleteDialogComponent],
  entryComponents: [],
})
export class SharedModule {}
