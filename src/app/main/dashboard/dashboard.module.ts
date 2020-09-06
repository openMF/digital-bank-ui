import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbCheckboxModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardChartsPanelComponent } from './charts-panel/charts-panel.component';
import { OrdersChartComponent } from './charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from './charts-panel/charts/profit-chart.component';
import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { ChartPanelSummaryComponent } from './charts-panel/chart-panel-summary/chart-panel-summary.component';
import { ChartModule } from 'angular2-chartjs';
import { StatusCardComponent } from './status-card/status-card.component';
import { ECommerceLegendChartComponent } from './legend-chart/legend-chart.component';
import { EchartsPieComponent } from './pie-charts/echarts-pie.component';
import { SharedModule } from '../common/common.module';
import { AccountActivityComponent } from './account-activity/account-activity.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    NbCheckboxModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardChartsPanelComponent,
    ChartPanelHeaderComponent,
    ChartPanelSummaryComponent,
    OrdersChartComponent,
    ProfitChartComponent,
    StatusCardComponent,
    ECommerceLegendChartComponent,
    EchartsPieComponent,
    AccountActivityComponent,
  ],
  providers: [],
})
export class DashboardModule {}
