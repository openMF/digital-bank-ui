/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([
  { provide: 'tokenExpiryBuffer', useValue: 1000 * 60 },
  { provide: 'cacheExpiry', useValue: 10000 },
  { provide: 'identityBaseUrl', useValue: '/identity/v1' },
  { provide: 'officeBaseUrl', useValue: '/api/office/v1' },
  { provide: 'customerBaseUrl', useValue: '/api/customer/v1' },
  { provide: 'accountingBaseUrl', useValue: '/api/accounting/v1' },
  { provide: 'portfolioBaseUrl', useValue: '/api/portfolio/v1' },
  { provide: 'depositAccountBaseUrl', useValue: '/api/deposit/v1' },
  { provide: 'tellerBaseUrl', useValue: '/api/teller/v1' },
  { provide: 'reportingBaseUrl', useValue: '/api/reporting/v1' },
  { provide: 'chequeBaseUrl', useValue: '/api/cheques/v1' },
  { provide: 'payrollBaseUrl', useValue: '/api/payroll/v1' },
  { provide: 'groupBaseUrl', useValue: '/api/group/v1' },
])
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
