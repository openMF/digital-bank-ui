import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { AccessDeniedComponent } from './access.denied.component';
import { NotificationComponent } from './notification.component';
import { mainRoutingProviders } from './main-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [MainRoutingModule, ThemeModule, NbMenuModule, MatButtonModule, MatIconModule, MatSnackBarModule, CovalentDialogsModule],
  declarations: [MainComponent, AccessDeniedComponent, NotificationComponent, DashboardComponent],
  providers: [mainRoutingProviders],
})
export class MainModule {}
