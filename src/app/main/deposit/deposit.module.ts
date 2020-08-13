import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositComponent } from './deposit.component';
import { DepositFormComponent } from './deposit-form/deposit-form.component';
import { DepositDetailComponent } from './deposit-detail/deposit-detail.component';
import { DividendsComponent } from './deposit-detail/dividends/dividends.component';
import { DividendFormComponent } from './deposit-detail/dividends/dividend-form/dividend-form.component';
import { DepositChargesComponent } from './deposit-form/deposit-charges/deposit-charges.component';
import { DepositRoutingModule } from './deposit-routing.module';
import * as fromProducts from './store/index';
import { DepositProductDefinitionNotificationEffects } from './store/effects/notification.effects';
import { DepositProductDefinitionRouteEffects } from './store/effects/route.effects';
import { DepositProductDefinitionApiEffects } from './store/effects/service.effects';
import { DepositProductDividendApiEffects } from './store/dividends/effects/service.effects';
import { DepositProductDividendNotificationEffects } from './store/dividends/effects/notification.effects';
import { DepositProductDividendRouteEffects } from './store/dividends/effects/route.effects';
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
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductDefinitionExistsGuard } from './product-definition-exists.guard';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DepositCreateComponent } from './deposit-form/deposit-create/deposit-create.component';
import { DepositEditComponent } from './deposit-form/deposit-edit/deposit-edit.component';
import { RouterModule } from '@angular/router';
import { CustomSelectorFilterComponent } from './helper/custom-filter.component';
import { CustomRenderComponent } from './helper/custom-render.component';
import { CreateDividendFormComponent } from './deposit-detail/dividends/dividend-form/dividend-create.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    DepositRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbLayoutModule,
    NbInputModule,
    NbCheckboxModule,
    NbTreeGridModule,
    NbStepperModule,
    NbSelectModule,
    NbRadioModule,
    NbAlertModule,
    NbListModule,
    NbDatepickerModule,
    NbAutocompleteModule,
    Ng2SmartTableModule,
    NbIconModule,
    SharedModule,
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,

    /**
     * Define feature state
     */
    StoreModule.forFeature(fromProducts.depositProductsFeatureKey, fromProducts.reducers),
    EffectsModule.forFeature([
      DepositProductDefinitionNotificationEffects,
      DepositProductDefinitionRouteEffects,
      DepositProductDefinitionApiEffects,
      DepositProductDividendApiEffects,
      DepositProductDividendNotificationEffects,
      DepositProductDividendRouteEffects,
    ]),
  ],
  declarations: [
    DepositComponent,
    DepositFormComponent,
    DepositDetailComponent,
    DividendsComponent,
    DividendFormComponent,
    CreateDividendFormComponent,
    DepositChargesComponent,
    DepositCreateComponent,
    DepositEditComponent,
    CustomSelectorFilterComponent,
    CustomRenderComponent,
  ],
  providers: [ProductDefinitionExistsGuard],
})
export class DepositModule {}
