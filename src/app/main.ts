import { environment } from './../environment/environment';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
