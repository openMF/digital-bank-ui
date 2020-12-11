import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbLayoutModule, NbInputModule, NbIconModule, NbFormFieldModule } from '@nebular/theme';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    RouterModule,
    NbLayoutModule,
    NbIconModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbFormFieldModule,
    ReactiveFormsModule,
    NbEvaIconsModule,
    CovalentLoadingModule,
    MatTooltipModule,
    MatIconModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
