import { Routes } from '@angular/router';
import { CustomerIdentityCardListComponent } from './identity-card.list.component';
import { CreateCustomerIdentificationCardFormComponent } from './form/create.form.component';
import { CustomerIdentityCardIndexComponent } from './identity-card.index.component';
import { IdentityCardExistsGuard } from './identity-card-exists.guard';
import { CustomerIdentityCardDetailComponent } from './identity-card.detail.component';
import { EditCustomerIdentificationCardFormComponent } from './form/edit.form.component';
import { CreateIdentificationCardScanComponent } from './scans/form/create.form.component';

export const IdentityCardRoutes: Routes = [
  {
    path: '',
    component: CustomerIdentityCardListComponent,
    data: {
      title: 'Manage identification cards',
      hasPermission: { id: 'customer_identifications', accessLevel: 'READ' },
    },
  },
  {
    path: 'create',
    component: CreateCustomerIdentificationCardFormComponent,
    data: {
      title: 'Create identification card',
      hasPermission: { id: 'customer_identifications', accessLevel: 'CHANGE' },
    },
  },
  {
    path: 'detail/:number',
    component: CustomerIdentityCardIndexComponent,
    canActivate: [IdentityCardExistsGuard],
    children: [
      {
        path: '',
        component: CustomerIdentityCardDetailComponent,
        data: {
          title: 'Identification Card',
          hasPermission: { id: 'customer_identifications', accessLevel: 'READ' },
        },
      },
      {
        path: 'edit',
        component: EditCustomerIdentificationCardFormComponent,
        data: {
          title: 'Edit identification card',
          hasPermission: { id: 'customer_identifications', accessLevel: 'CHANGE' },
        },
      },
      {
        path: 'addScan',
        component: CreateIdentificationCardScanComponent,
        data: {
          title: 'Add identification card scan',
          hasPermission: { id: 'customer_identifications', accessLevel: 'CHANGE' },
        },
      },
    ],
  },
];
