import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/common.module';
import { CommonModule } from '@angular/common';
import { DepositCreateComponent } from './form/create.component';
import { DepositFormComponent } from './form/form.component';
import { DepositsListComponent } from './deposits.list.component';
import * as fromCustomerDeposit from './store/index';
import { DepositRoutingModule } from './deposits-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { DepositProductInstanceApiEffects } from './store/effects/service.effects';
import { DepositProductInstanceRouteEffects } from './store/effects/route.effects';
import { DepositProductInstanceNotificationEffects } from './store/effects/notification.effects';
import { DepositIndexComponent } from './detail/deposit.index.component';
import { DepositDetailComponent } from './detail/deposit.detail.component';
import { DepositInstanceExistsGuard } from './deposit-instance-exists.guard';
import { DepositEditComponent } from './form/edit.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { StoreModule } from '@ngrx/store';
import { CustomSelectorFilterComponent } from './helper/custom-filter.component';
import { CustomRenderComponent } from './helper/custom-render.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DepositRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbLayoutModule,
    NbInputModule,
    NbTreeGridModule,
    NbIconModule,
    NbCheckboxModule,
    NbListModule,
    NbStepperModule,
    NbRadioModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbAlertModule,
    NbDatepickerModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,

    /**
     * Define feature state
     */
    StoreModule.forFeature(fromCustomerDeposit.customerDepositFeatureKey, fromCustomerDeposit.reducers),
    EffectsModule.forFeature([
      DepositProductInstanceApiEffects,
      DepositProductInstanceRouteEffects,
      DepositProductInstanceNotificationEffects,
    ]),
  ],
  declarations: [
    DepositsListComponent,
    DepositFormComponent,
    DepositIndexComponent,
    DepositCreateComponent,
    DepositEditComponent,
    DepositDetailComponent,
    CustomRenderComponent,
    CustomSelectorFilterComponent,
  ],
  exports: [DepositsListComponent],
  providers: [DepositInstanceExistsGuard],
})
export class DepositsModule {}
