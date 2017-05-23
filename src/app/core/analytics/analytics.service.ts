import { environment } from './../../../environment/environment';
import { Subscription } from 'rxjs';
import { Injectable, Inject, forwardRef } from '@angular/core';

import { DeviceService } from '../device/device.service';

declare var ga:Function;

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
		private deviceService: DeviceService
	) {
		this.deviceService.getKioskNumber()
			.then((kioskNumber) => {
				this.kioskNumber = kioskNumber;
			});
	}

	/**
	 * Create a sessionId if we dont have one and send to Google Analytics
	 *
	 * @memberOf AnalyticsService
	 */
	startSession(forceNewSession?: boolean): void {
		if (!environment.analytics) {
			return;
		}
		if (!this.sessionId) {
			this.sessionId = Date.now().toString();
			ga('set', 'dimension1', this.kioskNumber);
			ga('send', 'pageview', {'sessionControl': 'start'});
			ga('set', 'userId', this.sessionId);
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
			ga('send', 'event', obj);
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
			ga('send', {
				hitType: 'pageView',
				page: pathname,
				user: this.sessionId
			});
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
		if (!environment.analytics) {
			return;
		}
		if (this.sessionId) {
			ga('send', 'pageview', {'sessionControl': 'end'});
			ga('set', 'userId', '');
			this.sessionId = undefined;
		}
	}

}
