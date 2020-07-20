import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeComponent } from './office.component';
import { OfficeRoutingModule } from './office-routing.module';
import { NbLayoutModule } from '@nebular/theme';

@NgModule({
  declarations: [OfficeComponent],
  imports: [CommonModule, OfficeRoutingModule, NbLayoutModule],
})
export class OfficeModule {}
