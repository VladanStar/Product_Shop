import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'popper.js/dist/popper.min.js';


import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
