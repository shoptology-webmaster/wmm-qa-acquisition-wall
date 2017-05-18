import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NavService } from '../../core/nav/nav.service';
import { AnalyticsService } from '../../core/analytics';
import { CrashReportingService } from '../../core/crash-reporting/crash-reporting.service';
import { ReloadService } from './../../core/reload/reload.service';
import { DeviceService } from './../../core/device/device.service';

/**
 * Handles session start/stop and path selection.
 *
 * @export
 * @class PassiveComponent
 */
@Component({
	selector: 'ko-passive',
	templateUrl: './passive.page.html'
})
export class PassivePage {

	constructor(
		private navCtrl: NavController,
		private navService: NavService,
		private analyticsService: AnalyticsService,
		private crashReportingService: CrashReportingService,
		private reloadService: ReloadService,
		private deviceService: DeviceService
	) {}

	ionViewWillEnter() {
		this.navService.setAccessibilityMode(false);
	}

	ionViewDidEnter() {
		// If we haven't configured the root page, set it up
		// mark it as set in navService
		this.reset();

		this.deviceService.isUpToDate()
			.subscribe((result) => {
				// console.log('Is up to date?', result);
				if (!result) {
					console.log('Version mismatch. Update required.');
					this.reloadService.startTimer(30000);
				} else {
					this.reloadService.startTimer();
				}
			}, (err) => {
				console.log('Error when asking if up to date', err);
				this.reloadService.startTimer();
			});

		this.navService.options.visible = false;
	}

	ionViewWillLeave() {}


	/**
	 * Go to the Find path pages.
	 *
	 * @returns {void}
	 *
	 * @memberOf PassiveComponent
	 */
	public goToFind(): void {
		this.crashReportingService.setUserContext({
			id: Date.now().toString()
		});
		this.analyticsService.startSession();
		this.analyticsService.sendEvent('Passive', 'tap', 'GoToFind');
		this.reloadService.stopTimer();
	}


	/**
	 * Reset the application state to make way for a new session.
	 *
	 * @returns {void}
	 *
	 * @memberOf PassiveComponent
	 */
	public reset(): void {
		this.analyticsService.stopSession();
	}

}
