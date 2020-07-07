import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password.component';
import { UserRoutingModule } from './user-routing.module';
import { NbButtonModule, NbCardModule, NbLayoutModule, NbInputModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PasswordComponent],
  imports: [
    UserRoutingModule,
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
export class UserModule {}
