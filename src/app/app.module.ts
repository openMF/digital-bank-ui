import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { HttpClientService } from './services/http/http.service';
import { IdentityService } from './services/identity/identity.service';
import { AuthenticationService } from './services/security/authn/authentication.service';
import { AppRoutingModule, appRoutingProviders } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store';
import { NotificationService } from './services/notification/notification.service';
import { PermittableGroupIdMapper } from './services/security/authz/permittable-group-id-mapper';
import { EffectsModule } from '@ngrx/effects';
import { SecurityRouteEffects } from './store/security/effects/route.effects';
import { SecurityApiEffects } from './store/security/effects/service.effects';
import { SecurityNotificationEffects } from './store/security/effects/notification.effects';
import { NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbToastrModule, NbWindowModule } from '@nebular/theme';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),

    StoreModule.forRoot({ state: reducer }),

    /**
     * Root effects
     */
    EffectsModule.forRoot([SecurityApiEffects, SecurityRouteEffects, SecurityNotificationEffects]),
  ],
  providers: [
    HttpClientService,
    AuthenticationService,
    PermittableGroupIdMapper,
    IdentityService,
    NotificationService,
    ...appRoutingProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
