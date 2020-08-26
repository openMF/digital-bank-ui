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
  NbDialogModule,
  NbListModule,
  NbAutocompleteModule,
  NbSelectModule,
  NbAlertModule,
  NbDatepickerModule,
  NbUserModule,
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
import { TaskListComponent } from './tasks/task.list.component';
import { TaskCreateFormComponent } from './tasks/form/create.form.component';
import { TaskEditFormComponent } from './tasks/form/edit.form.component';
import { TaskFormComponent } from './tasks/form/form.component';
import { TaskExistsGuard } from './tasks/task-exists.guard';
import { TaskIndexComponent } from './tasks/task.index.component';
import { TaskDetailComponent } from './tasks/task.detail.component';
import { CustomIconRenderComponent } from './tasks/helper/custom-icon-render.component';
import { CustomTypeRenderComponent } from './tasks/helper/custom-type-render.component';
import { CustomerActivityComponent } from './customer-detail/activity/activity.component';
import { CustomerDetailComponent } from './customer-detail/customer.detail.component';
import { CustomerTaskComponent } from './customer-detail/status/customer-task.component';
import { CustomerIndexComponent } from './customer-detail/customer.index.component';
import { CustomerStatusComponent } from './customer-detail/status/status.component';
import { CustomerPortraitComponent } from './customer-detail/portrait/portrait.component';
import { DepositsModule } from './deposits/deposits.module';
import { CreateCustomerCatalogFormComponent } from './custom-fields/form/create.form.component';
import { CatalogDetailComponent } from './custom-fields/catalog.detail.component';
import { CustomerCatalogFormComponent } from './custom-fields/form/form.component';
import { FieldFormComponent } from './custom-fields/components/field.component';
import { FieldFormService } from './custom-fields/services/field-form.service';
import { EditCatalogFieldFormComponent } from './custom-fields/fields/form/edit.form.component';
import { FieldDetailComponent } from './custom-fields/fields/field.detail.component';
import { FieldIndexComponent } from './custom-fields/fields/field.index.component';
import { CatalogFieldFormComponent } from './custom-fields/fields/form/form.component';
import { FieldExistsGuard } from './custom-fields/fields/field-exists.guard';
import { CustomerCustomValuesComponent } from './custom-fields/components/value.component';
import { CustomerFormComponent } from './form/form.component';
import { CreateCustomerFormComponent } from './form/create/create.form.component';
import { CustomerDetailFormComponent } from './form/detail/detail.component';
import { CustomerOfficesComponent } from './form/offices/offices.component';
import { CustomerContactFormComponent } from './form/contact/contact.component';
import { EditCustomerFormComponent } from './form/edit/edit.form.component';
import { CustomerCustomFieldsComponent } from './form/customFields/custom-fields.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomSelectorFilterComponent,
    CustomRenderComponent,
    TaskListComponent,
    TaskIndexComponent,
    TaskCreateFormComponent,
    TaskEditFormComponent,
    TaskFormComponent,
    TaskDetailComponent,
    CustomTypeRenderComponent,
    CustomIconRenderComponent,
    CustomerFormComponent,
    CreateCustomerFormComponent,
    CustomerDetailFormComponent,
    CustomerOfficesComponent,
    EditCustomerFormComponent,
    CustomerCustomFieldsComponent,
    CustomerContactFormComponent,
    CustomerDetailComponent,
    CustomerTaskComponent,
    CustomerIndexComponent,
    CustomerStatusComponent,
    CustomerPortraitComponent,
    CustomerActivityComponent,
    CreateCustomerCatalogFormComponent,
    CustomerCustomValuesComponent,
    CatalogFieldFormComponent,
    FieldIndexComponent,
    FieldDetailComponent,
    EditCatalogFieldFormComponent,
    FieldFormComponent,
    CustomerCatalogFormComponent,
    CatalogDetailComponent,
  ],
  imports: [
    DepositsModule,
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
    NbUserModule,
    NbRadioModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbAlertModule,
    NbDatepickerModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(),

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
  providers: [CustomerExistsGuard, CatalogExistsGuard, TaskExistsGuard, FieldExistsGuard, FieldFormService],
})
export class CustomerModule {}
