import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { NbButtonModule, NbCardModule, NbLayoutModule, NbInputModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    SettingsRoutingModule,
    CommonModule,
    NbCardModule,
    FormsModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule {}
