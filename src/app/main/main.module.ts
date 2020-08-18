/** Angular Imports */
import { NgModule } from '@angular/core';

/** Nebular Theme Imports */
import { NbMenuModule, NbDialogModule, NbCardModule, NbButtonModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';

/** Custom Modules */
import { MainRoutingModule } from './main-routing.module';
import { mainRoutingProviders } from './main-routing.module';

/** Custom Components */
import { MainComponent } from './main.component';
import { AccessDeniedComponent } from './access-denied/access.denied.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    MainComponent,
    AccessDeniedComponent,
    NotificationComponent,
    DashboardComponent,
  ],
  imports: [
    MainRoutingModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbMenuModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
  ],
  providers: [mainRoutingProviders],
})
export class MainModule {}
