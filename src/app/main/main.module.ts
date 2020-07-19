/** Angular Imports */
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

/** Nebular Theme Imports */
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';

/** Covalent Imports */
import { CovalentDialogsModule } from '@covalent/core/dialogs';

/** Custom Modules */
import { MainRoutingModule } from './main-routing.module';
import { mainRoutingProviders } from './main-routing.module';

/** Custom Components */
import { MainComponent } from './main.component';
import { AccessDeniedComponent } from './access-denied/access.denied.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
    NbMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    CovalentDialogsModule,
  ],
  providers: [mainRoutingProviders],
})
export class MainModule {}
