import { ExhibitService } from './exhibit/exhibit.service';
import { PagesModule } from './../pages/pages.module';
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { SharedModule } from './../shared/shared.module';

import { NavComponent } from './nav/nav.component';
import { NavService } from './nav/nav.service';
import { DeviceService } from './device/device.service';
import { AnalyticsService, AnalyticsTimerService } from './analytics';
import { CrashReportingService, CrashReportingErrorHandler } from './crash-reporting/crash-reporting.service';
import { TimeoutComponent } from './timeout/timeout.component';
import { APIService } from './api';
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
		DeviceService,
		APIService,
		ReloadService,
		AnalyticsService,
		AnalyticsTimerService,
		CrashReportingService,
		ExhibitService,
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
