import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import { NbButtonModule, NbCardModule, NbLayoutModule, NbInputModule } from '@nebular/theme';
// import { EffectsModule } from '@ngrx/effects';
// import { RoleApiEffects } from './store/effects/service.effects';
// import { RoleRouteEffects } from './store/effects/route.effects';
// import { RoleNotificationEffects } from './store/effects/notification.effects';
// import { StoreModule } from '@ngrx/store';
// import * as fromRoles from './store/index';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleComponent } from './role.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbIconModule } from '@nebular/theme';
import { CovalentDialogsModule } from '@covalent/core/dialogs';

@NgModule({
  declarations: [RoleDetailComponent, RoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbLayoutModule,
    NbInputModule,
    Ng2SmartTableModule,
    NbIconModule,
    CovalentDialogsModule,

    // StoreModule.forFeature(fromRoles.rolesFeatureKey, fromRoles.roleModuleReducer),
    // EffectsModule.forFeature([RoleApiEffects, RoleRouteEffects, RoleNotificationEffects]),
  ],
})
export class RoleModule {}
