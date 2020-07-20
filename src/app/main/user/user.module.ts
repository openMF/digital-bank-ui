import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { NbLayoutModule } from '@nebular/theme';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, NbLayoutModule],
})
export class UserModule {}
