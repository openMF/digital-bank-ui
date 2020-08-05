import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
  NbInputModule,
  NbDialogModule,
  NbTreeGridModule,
  NbIconModule,
  NbSelectModule,
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { UserApiEffects } from './store/effects/service.effects';
import { UserRouteEffects } from './store/effects/route.effects';
import { UserNotificationEffects } from './store/effects/notification.effects';
import { StoreModule } from '@ngrx/store';
import * as fromUsers from './store/index';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserCreateComponent } from './user-form/user-create/user-create.component';
import { UserEditComponent } from './user-form/user-edit/user-edit.component';
import { SharedModule } from '../common/common.module';
import { UserExistsGuard } from './user-exists.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DeleteDialogComponent } from '../common/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [UserComponent, UserDetailComponent, UserFormComponent, UserCreateComponent, UserEditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbLayoutModule,
    NbInputModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbSelectModule,
    SharedModule,
    NbDialogModule.forChild(),
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,

    /**
     * Define feature state
     */
    StoreModule.forFeature(fromUsers.userFeatureKey, fromUsers.reducers),
    EffectsModule.forFeature([UserApiEffects, UserRouteEffects, UserNotificationEffects]),
  ],
  providers: [UserExistsGuard],
  entryComponents: [DeleteDialogComponent],
})
export class UserModule {}
