import { SharedModule } from '../../../common/common.module';
import { IdentityCardRoutes } from './identity-card.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IdentityCardExistsGuard } from './identity-card-exists.guard';
import { CustomerIdentityCardListComponent } from './identity-card.list.component';
import { CreateCustomerIdentificationCardFormComponent } from './form/create.form.component';
import { CustomerIdentityCardIndexComponent } from './identity-card.index.component';
import { CustomerIdentityCardDetailComponent } from './identity-card.detail.component';
import { EditCustomerIdentificationCardFormComponent } from './form/edit.form.component';
import { CustomerIdentificationCardNotificationEffects } from '../../store/identityCards/effects/notification.effects';
import { EffectsModule } from '@ngrx/effects';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomerIdentificationCardRouteEffects } from '../../store/identityCards/effects/route.effects';
import { CustomerIdentificationCardApiEffects } from '../../store/identityCards/effects/service.effects';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdentityCardFormComponent } from './form/identity-card-form.component';
import { CustomerIdentityCardScanListComponent } from './scans/scan.list.component';
import { CustomerIdentificationCardScanApiEffects } from '../../store/identityCards/scans/effects/service.effects';
import { CustomerIdentificationCardScanNotificationEffects } from '../../store/identityCards/scans/effects/notification.effects';
import { CreateIdentificationCardScanComponent } from './scans/form/create.form.component';
import { IdentificationCardScanComponent } from './scans/form/scan.form.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CustomerIdentificationCardScanRouteEffects } from '../../store/identityCards/scans/effects/route.effects';
import {
  NbButtonModule,
  NbStepperModule,
  NbCardModule,
  NbLayoutModule,
  NbInputModule,
  NbTreeGridModule,
  NbIconModule,
  NbRadioModule,
  NbCheckboxModule,
  NbListModule,
  NbAutocompleteModule,
  NbDialogModule,
  NbSelectModule,
  NbAlertModule,
  NbDatepickerModule,
  NbUserModule,
} from '@nebular/theme';

@NgModule({
  imports: [
    RouterModule.forChild(IdentityCardRoutes),
    SharedModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbStepperModule,
    NbCardModule,
    NbLayoutModule,
    NbInputModule,
    NbTreeGridModule,
    NbIconModule,
    NbRadioModule,
    NbCheckboxModule,
    NbListModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbAlertModule,
    NbDatepickerModule,
    NbUserModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    NbDialogModule.forChild(),

    EffectsModule.forFeature([
      CustomerIdentificationCardApiEffects,
      CustomerIdentificationCardRouteEffects,
      CustomerIdentificationCardNotificationEffects,
      CustomerIdentificationCardScanApiEffects,
      CustomerIdentificationCardScanRouteEffects,
      CustomerIdentificationCardScanNotificationEffects,
    ]),
  ],
  declarations: [
    CustomerIdentityCardListComponent,
    CreateCustomerIdentificationCardFormComponent,
    CustomerIdentityCardIndexComponent,
    CustomerIdentityCardDetailComponent,
    EditCustomerIdentificationCardFormComponent,
    IdentityCardFormComponent,
    CustomerIdentityCardScanListComponent,
    CreateIdentificationCardScanComponent,
    IdentificationCardScanComponent,
  ],
  providers: [IdentityCardExistsGuard],
})
export class IdentityCardModule {}
