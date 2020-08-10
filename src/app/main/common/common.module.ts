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
  NbTooltipModule,
  NbAutocompleteModule,
} from '@nebular/theme';
import { IdInputComponent } from './id-input/id-input.component';
import { FormFinalActionComponent } from './forms/form-final-action.component';
import { AccountSelectComponent } from './account-select/account-select.component';
import { LedgerSelectComponent } from './ledger-select/ledger-select.component';
import { CustomNumberFilterComponent } from './custom-filters/custom-number-filter.component';
import { DisplayFimsDate } from './date/fims-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbCardModule,
    NbTooltipModule,
    NbIconModule,
    NbLayoutModule,
    NbInputModule,
    NbCheckboxModule,
    NbAutocompleteModule,
    NbListModule,
    NbTreeGridModule,
    NbDialogModule.forChild(),
  ],
  declarations: [
    PermissionDirective,
    FabButtonComponent,
    IdInputComponent,
    DeleteDialogComponent,
    FormFinalActionComponent,
    AccountSelectComponent,
    LedgerSelectComponent,
    CustomNumberFilterComponent,
    DisplayFimsDate,
  ],
  exports: [
    PermissionDirective,
    FabButtonComponent,
    IdInputComponent,
    DeleteDialogComponent,
    FormFinalActionComponent,
    AccountSelectComponent,
    LedgerSelectComponent,
    CustomNumberFilterComponent,
    DisplayFimsDate,
  ],
  entryComponents: [],
})
export class SharedModule {}
