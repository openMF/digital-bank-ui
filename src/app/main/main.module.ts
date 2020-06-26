import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [MainRoutingModule, ThemeModule, NbMenuModule],
  declarations: [MainComponent],
})
export class MainModule {}
