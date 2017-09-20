import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';

import { IndexModule } from './app/pages/index/index.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(IndexModule);
