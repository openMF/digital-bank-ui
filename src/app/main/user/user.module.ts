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
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { UserApiEffects } from './store/effects/service.effects';
import { RoleRouteEffects } from './store/effects/route.effects';
import { RoleNotificationEffects } from './store/effects/notification.effects';
import { StoreModule } from '@ngrx/store';
import * as fromUsers from './store/index';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CovalentDialogsModule } from '@covalent/core/dialogs';

@NgModule({
  declarations: [UserComponent],
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
    CovalentDialogsModule,
    NbDialogModule.forChild(),

    /**
     * Define feature state
     */
    StoreModule.forFeature(fromUsers.userFeatureKey, fromUsers.reducers),
    EffectsModule.forFeature([UserApiEffects, RoleRouteEffects, RoleNotificationEffects]),
  ],
  providers: [],
  entryComponents: [],
})
export class UserModule {}
