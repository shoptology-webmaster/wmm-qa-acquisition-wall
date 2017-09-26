import { CrashReportingService } from './../crash-reporting/crash-reporting.service';
import { environment } from './../../../environment/environment';
import { Subscription } from 'rxjs';
import { Injectable, Inject, forwardRef } from '@angular/core';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { DeviceService } from '../device/device.service';

/**
 * Handles tracking and reporting of events, sessions, and pageviews
 *
 * @export
 * @class AnalyticsService
 */
@Injectable()
export class AnalyticsService {
	public sessionId: string;
	public subscription: Subscription;
	public kioskNumber: number = 0;

	constructor(
		@Inject(forwardRef(() => DeviceService))
		private deviceService: DeviceService,
		private crashReportingService: CrashReportingService,
		private ga: GoogleAnalytics
	) {
		this.deviceService.getKioskNumber()
			.then((kioskNumber) => {
				this.kioskNumber = kioskNumber;
			});

		if (environment.analytics) {
			setTimeout(() => {
				try {
					this.ga.startTrackerWithId(environment.googleAnalyticsId);
				} catch (e) {
					this.crashReportingService.captureMessage('GA not registered properly', {
						extra: e
					});
				}
			}, 3000);
		}

	}

	/**
	 * Create a sessionId if we dont have one and send to Google Analytics
	 *
	 * @memberOf AnalyticsService
	 */
	startSession(forceNewSession?: boolean): void {
		if (!environment.analytics || !this.ga) {
			console.log('analytics disabled');
			return;
		}

		if (!this.sessionId) {
			this.sessionId = Date.now().toString();
			try {
				this.ga.setUserId(this.sessionId);
				this.ga.trackEvent('session', 'start', '', 1, true);
				this.ga.addCustomDimension(1, this.kioskNumber.toString());

			} catch (e) {
				this.crashReportingService.captureMessage('GA not registered properly', {
					extra: e
				});
			}

		} else if (forceNewSession) {
			this.stopSession();
			this.startSession();
		}
	}

	/**
	 * Send Analytics Event
	 *
	 * @param {string} category
	 * @param {string} action
	 * @param {string} [label]
	 * @param {number} [val]
	 *
	 * @returns {void}
	 *
	 * @memberOf AnalyticsService
	 */
	sendEvent(category: string, action: string, label?: string, val?: number, extra?: any): void {
		this.startSession();
		let obj: any = {
			eventCategory: category,
			eventAction: action,
			user: this.sessionId
		};

		if (label) {
			obj.eventLabel = label;
		}

		if (val) {
			obj.eventValue = val;
		}

		if (extra) {
			obj.extra = extra;
		}

		if (environment.analytics) {
			try {
				this.ga.trackEvent(category, action, label, val);
			} catch (e) {
				this.crashReportingService.captureMessage('GA not registered properly', {
					extra: e
				});
			}
		}
	}

	/**
	 * Send a Pageview
	 *
	 * @param {string} pathname
	 *
	 * @returns {void}
	 *
	 * @memberOf AnalyticsService
	 */
	sendPageview(pathname: string): void {
		this.startSession();

		if (environment.analytics) {
			try {
				this.ga.trackView(pathname);
			} catch (e) {
				this.crashReportingService.captureMessage('GA not registered properly', {
					extra: e
				});
			}
		}
	}

	/**
	 * Resets our sessionId so until the next event fires
	 *
	 * @returns {void}
	 *
	 * @memberOf AnalyticsService
	 */
	stopSession(): void {
		if (!environment.analytics || !this.ga) {
			console.log('analytics disabled');
			return;
		}

		if (this.sessionId) {
			this.sessionId = undefined;
		}
	}

}
