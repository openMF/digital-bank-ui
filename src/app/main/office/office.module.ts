/** Angular imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeRoutingModule } from './office-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** ngrx store imports */
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromOffices from './store/index';

/** Nebular imports */
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
  NbSelectModule,
  NbAlertModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbEvaIconsModule } from '@nebular/eva-icons';

/** Custom Effects */
import { OfficeNotificationEffects } from './store/effects/notification.effects';
import { OfficeRouteEffects } from './store/effects/route.effects';
import { OfficeApiEffects } from './store/effects/service.effects';
import { TellerApiEffects } from './store/teller/effects/service.effects';
import { TellerRouteEffects } from './store/teller/effects/route.effects';
import { TellerNotificationEffects } from './store/teller/effects/notification.effects';
import { TellerDenominationApiEffects } from './store/teller/denomination/effects/service.effects';
import { TellerDenominationRouteEffects } from './store/teller/denomination/effects/route.effects';
import { TellerDenominationNotificationEffects } from './store/teller/denomination/effects/notification.effects';

/** Custom Components */
import { OfficeComponent } from './office.component';
import { OfficeIndexComponent } from './office-detail/office.index.component';
import { HeadquarterNotFoundComponent } from './headquarter/headquarter-not-found.component';
import { OfficeFormComponent } from './office-form/office-form.component';
import { OfficeDetailComponent } from './office-detail/office-detail.component';
import { CreateOfficeFormComponent } from './office-form/office-create/office-create.component';
import { EditOfficeFormComponent } from './office-form/office-edit/office-edit.component';

/** Custom Guards */
import { HeadquarterGuard } from './headquarter/headquarter.guard';
import { OfficeExistsGuard } from './office-exists.guard';

/** Custom Modules */
import { SharedModule } from '../common/common.module';

@NgModule({
  declarations: [
    OfficeComponent,
    HeadquarterNotFoundComponent,
    OfficeFormComponent,
    OfficeIndexComponent,
    OfficeDetailComponent,
    CreateOfficeFormComponent,
    EditOfficeFormComponent,
    EditOfficeFormComponent,
    CreateOfficeFormComponent,
  ],
  imports: [
    CommonModule,
    OfficeRoutingModule,
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
    NbButtonModule,
    NbStepperModule,
    NbCardModule,
    SharedModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,

    /**
     * Define feature state
     */
    StoreModule.forFeature(fromOffices.officeFeatureKey, fromOffices.reducers),
    EffectsModule.forFeature([
      OfficeApiEffects,
      OfficeRouteEffects,
      OfficeNotificationEffects,
      TellerApiEffects,
      TellerRouteEffects,
      TellerNotificationEffects,
      TellerDenominationApiEffects,
      TellerDenominationRouteEffects,
      TellerDenominationNotificationEffects,
    ]),
  ],
  providers: [HeadquarterGuard, OfficeExistsGuard],
})
export class OfficeModule {}
