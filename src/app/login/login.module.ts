import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { NbButtonModule, NbCardModule, NbLayoutModule, NbInputModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    ReactiveFormsModule,
    CovalentLoadingModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
