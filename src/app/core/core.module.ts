import { HeartbeatService } from './heartbeat/heartbeat.service';
import { ExhibitService } from './exhibit/exhibit.service';
import { PagesModule } from './../pages/pages.module';
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { SharedModule } from './../shared/shared.module';

import { NavComponent } from './nav/nav.component';
import { NavService } from './nav/nav.service';
import { APIService } from './api/api.service';
import { DeviceService } from './device/device.service';
import { AnalyticsService } from './analytics';
import { CrashReportingService, CrashReportingErrorHandler } from './crash-reporting/crash-reporting.service';
import { CacheService } from './cache/cache.service';
import { TimeoutComponent } from './timeout/timeout.component';
import { ReloadService } from './reload/reload.service';

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		SharedModule,
		PagesModule
	],
	exports: [
		NavComponent,
		TimeoutComponent
	],
	declarations: [
		NavComponent,
		TimeoutComponent
	],
	providers: [
		NavService,
		APIService,
		CacheService,
		DeviceService,
		ReloadService,
		AnalyticsService,
		CrashReportingService,
		ExhibitService,
		HeartbeatService,
		{ provide: ErrorHandler, useClass: CrashReportingErrorHandler }
	]
})
export class CoreModule {
	constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
		// Only let AppModule import this
		if (parentModule) {
			throw new Error(`Core Module has already been loaded. Import Core modules in the AppModule only.`);
		}
	}
}
