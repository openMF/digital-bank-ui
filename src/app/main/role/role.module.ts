import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import {
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
  NbInputModule,
  NbDialogModule,
  NbTreeGridModule,
  NbIconModule,
  NbCheckboxModule,
  NbListModule,
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { RoleApiEffects } from './store/effects/service.effects';
import { RoleRouteEffects } from './store/effects/route.effects';
import { RoleNotificationEffects } from './store/effects/notification.effects';
import { StoreModule } from '@ngrx/store';
import * as fromRoles from './store/index';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleComponent } from './role.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleExistsGuard } from './role-exists.guard';
import { FormPermissionService } from './helper/form-permission.service';
import { FsIconComponent } from './role-detail/role-detail.component';
import { SharedModule } from '../common/common.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RoleCreateComponent } from './role-form/role-create/role-create.component';
import { RoleEditComponent } from './role-form/role-edit/role-edit.component';
import { PermissionListItemComponent } from './role-form/permission-list-item/permission-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RoleRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbLayoutModule,
    NbInputModule,
    NbCheckboxModule,
    NbTreeGridModule,
    NbListModule,
    Ng2SmartTableModule,
    NbIconModule,
    CovalentDialogsModule,
    SharedModule,
    NbDialogModule.forChild(),
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,

    /**
     * Define feature state
     */
    StoreModule.forFeature(fromRoles.roleFeatureKey, fromRoles.reducers),
    EffectsModule.forFeature([RoleApiEffects, RoleRouteEffects, RoleNotificationEffects]),
  ],
  declarations: [
    RoleDetailComponent,
    RoleComponent,
    DeleteDialogComponent,
    RoleFormComponent,
    FsIconComponent,
    RoleCreateComponent,
    RoleEditComponent,
    PermissionListItemComponent,
  ],
  providers: [RoleExistsGuard, FormPermissionService],
  entryComponents: [DeleteDialogComponent],
})
export class RoleModule {}
