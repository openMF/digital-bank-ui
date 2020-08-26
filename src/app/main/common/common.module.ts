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
import { AddressFormComponent } from './address/address.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { CommandDisplayComponent } from './command-display/command-display.component';
import { ImageComponent } from './image/image.component';
import { TextInputComponent } from './text-input/text-input.component';
import { SelectListComponent } from './select-list/select-list.component';

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
    AddressFormComponent,
    BackButtonComponent,
    CommandDisplayComponent,
    ImageComponent,
    TextInputComponent,
    SelectListComponent,
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
    AddressFormComponent,
    BackButtonComponent,
    CommandDisplayComponent,
    ImageComponent,
    TextInputComponent,
    SelectListComponent,
  ],
  entryComponents: [],
})
export class SharedModule {}
