import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/common.module';
import { CommonModule } from '@angular/common';
import { DepositCreateComponent } from './form/create.component';
import { DepositFormComponent } from './form/form.component';
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
import { AccountActivityComponent } from './detail/account-activity/account-activity.component';
import { NgxEchartsModule } from 'ngx-echarts';
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
  NbTabsetModule,
  NbSelectModule,
  NbAlertModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import { TransactionHistoryComponent } from './detail/transaction-history/transaction-history.component';
import { InterestRateComponent } from './detail/interest-rate/interest-rate.component';
import { EchartsPieComponent } from './detail/pie-charts/echarts-pie.component';
import { AccountDetailsComponent } from './detail/account-details/account-details.component';

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
    NbTabsetModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbAlertModule,
    NbDatepickerModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule,

    /**
     * Define feature state
     */
    StoreModule.forFeature(
      fromCustomerDeposit.customerDepositFeatureKey,
      fromCustomerDeposit.reducers,
    ),
    EffectsModule.forFeature([
      DepositProductInstanceApiEffects,
      DepositProductInstanceRouteEffects,
      DepositProductInstanceNotificationEffects,
    ]),
  ],
  declarations: [
    DepositFormComponent,
    DepositIndexComponent,
    DepositCreateComponent,
    DepositEditComponent,
    DepositDetailComponent,
    AccountActivityComponent,
    TransactionHistoryComponent,
    InterestRateComponent,
    EchartsPieComponent,
    AccountDetailsComponent,
  ],
  providers: [DepositInstanceExistsGuard],
})
export class DepositsModule {}
