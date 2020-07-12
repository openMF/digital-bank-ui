import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { NbButtonModule, NbCardModule, NbLayoutModule, NbInputModule } from '@nebular/theme';

@NgModule({
  declarations: [],
  imports: [CommonModule, RolesRoutingModule, NbButtonModule, NbCardModule, NbLayoutModule, NbInputModule],
})
export class RolesModule {}
