import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
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
import * as fromCustomers from './store/index';
import { CustomerNotificationEffects } from './store/effects/notification.effects';
import { CustomerRouteEffects } from './store/effects/route.effects';
import { CustomerApiEffects } from './store/effects/service.effects';
import { CustomerCommandApiEffects } from './store/commands/effects/service.effects';
import { CustomerTasksNotificationEffects } from './store/customerTasks/effects/notification.effects';
import { CustomerTasksApiEffects } from './store/customerTasks/effects/service.effects';
import { CustomerTasksRouteEffects } from './store/customerTasks/effects/route.effects';
import { TasksApiEffects } from './store/tasks/effects/service.effects';
import { TasksRouteEffects } from './store/tasks/effects/route.effects';
import { TasksNotificationEffects } from './store/tasks/effects/notification.effects';
import { CustomerPayrollApiEffects } from './store/payroll/effects/service.effects';
import { CustomerPayrollRouteEffects } from './store/payroll/effects/route.effects';
import { CustomerPayrollNotificationEffects } from './store/payroll/effects/notification.effects';
import { CatalogApiEffects } from './store/catalogs/effects/service.effects';
import { CatalogRouteEffects } from './store/catalogs/effects/route.effects';
import { CatalogNotificationEffects } from './store/catalogs/effects/notification.effects';
import { SharedModule } from '../common/common.module';
import { CustomerExistsGuard } from './customer-exists.guard';
import { CatalogExistsGuard } from './custom-fields/catalog-exists.guard';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomSelectorFilterComponent } from './helper/custom-filter.component';
import { CustomRenderComponent } from './helper/custom-render.component';

@NgModule({
  declarations: [CustomerComponent, CustomSelectorFilterComponent, CustomRenderComponent],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule,
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
    StoreModule.forFeature(fromCustomers.customerFeatureKey, fromCustomers.reducers),
    EffectsModule.forFeature([
      CustomerApiEffects,
      CustomerRouteEffects,
      CustomerNotificationEffects,
      TasksApiEffects,
      TasksRouteEffects,
      TasksNotificationEffects,
      CustomerTasksApiEffects,
      CustomerTasksRouteEffects,
      CustomerTasksNotificationEffects,
      CustomerCommandApiEffects,
      CustomerPayrollApiEffects,
      CustomerPayrollRouteEffects,
      CustomerPayrollNotificationEffects,
      CatalogApiEffects,
      CatalogRouteEffects,
      CatalogNotificationEffects,
    ]),
  ],
  providers: [CustomerExistsGuard, CatalogExistsGuard],
})
export class CustomerModule {}
