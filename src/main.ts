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
])
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
