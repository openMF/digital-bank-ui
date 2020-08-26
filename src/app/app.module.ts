/** Angular Imports */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

/** Nebular Theme Imports */
import { NbDatepickerModule, NbMenuModule, NbSidebarModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';

/** ngrx Imports */
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './store';

/** Custom Components */
import { AppComponent } from './app.component';

/** Custom Modules */
import { LoginModule } from './login/login.module';

/** Custom Providers */
import { PermittableGroupIdMapper } from './services/security/authz/permittable-group-id-mapper';

/** Custom Services */
import { HttpClientService } from './services/http/http.service';
import { IdentityService } from './services/identity/identity.service';
import { AuthenticationService } from './services/security/authn/authentication.service';
import { NotificationService } from './services/notification/notification.service';
import { ExistsGuardService } from './main/common/guards/exists-guard';
import { DepositAccountService } from './services/depositAccount/deposit-account.service';
import { CurrencyService } from './services/currency/currency.service';
import { AccountingService } from './services/accounting/accounting.service';
import { ImageService } from './services/image/image.service';
import { PayrollService } from './services/payroll/payroll.service';
import { CustomerService } from './services/customer/customer.service';
import { CatalogService } from './services/catalog/catalog.service';
import { OfficeService } from './services/office/office.service';
import { TellerService } from './services/teller/teller-service';
import { CountryService } from './services/country/country.service';
import { ChequeService } from './services/cheque/cheque.service';

/** Custom Effects */
import { SecurityRouteEffects } from './store/security/effects/route.effects';
import { SecurityApiEffects } from './store/security/effects/service.effects';
import { SecurityNotificationEffects } from './store/security/effects/notification.effects';
import { RoleSearchApiEffects } from './store/role/effects/service.effects';
import { UserSearchApiEffects } from './store/user/effects/service.effects';
import { CustomerSearchApiEffects } from './store/customer/effects/service.effects';
import { OfficeSearchApiEffects } from './store/office/effects/service.effects';

/** App Routing Module */
import { AppRoutingModule, appRoutingProviders } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,

    /** Theme modules */
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbEvaIconsModule,

    /** ngrx root modules */
    StoreModule.forRoot(
      { Root: reducer },
      {
        runtimeChecks: {
          strictActionImmutability: false,
        },
      },
    ),
    EffectsModule.forRoot([
      SecurityApiEffects,
      SecurityRouteEffects,
      SecurityNotificationEffects,
      RoleSearchApiEffects,
      UserSearchApiEffects,
      CustomerSearchApiEffects,
      OfficeSearchApiEffects,
    ]),

    StoreDevtoolsModule.instrument({
      name: 'Digital bank',
    }),
  ],
  providers: [
    HttpClientService,
    AuthenticationService,
    PermittableGroupIdMapper,
    IdentityService,
    NotificationService,
    ExistsGuardService,
    DepositAccountService,
    CurrencyService,
    AccountingService,
    ImageService,
    PayrollService,
    CustomerService,
    CatalogService,
    OfficeService,
    CountryService,
    TellerService,
    ChequeService,
    ...appRoutingProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
