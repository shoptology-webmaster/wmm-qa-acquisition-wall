import { environment } from './../../../environment/environment';
import { Subscription } from 'rxjs';
import { Injectable, Inject, forwardRef } from '@angular/core';

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
	public ga: any = window['ga'];

	constructor(
		@Inject(forwardRef(() => DeviceService))
		private deviceService: DeviceService
	) {
		this.deviceService.getKioskNumber()
			.then((kioskNumber) => {
				this.kioskNumber = kioskNumber;
			});

		this.ga.startTrackerWithId(environment.googleAnalyticsId);
	}

	/**
	 * Create a sessionId if we dont have one and send to Google Analytics
	 *
	 * @memberOf AnalyticsService
	 */
	startSession(forceNewSession?: boolean): void {
		if (!environment.analytics) {
			console.log('analytics disabled');
			return;
		}
		if (!this.sessionId) {
			console.log('starting new session');
			this.sessionId = Date.now().toString();
			//this.ga('set', 'dimension1', this.kioskNumber);
			//this.ga('send', 'pageview', {'sessionControl': 'start'});
			this.ga.setUserId(this.sessionId, 1);
			this.ga.setVar('sc', 'start');
			this.ga.addCustomDimension(1, this.kioskNumber.toString());
		} else if (forceNewSession) {
			console.log('forcing new session');
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
			console.log('sending event');
			//this.ga('send', 'event', obj);
			this.ga.trackEvent(category, action, label, val);
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
			console.log('sending pageview');
			// this.ga('send', {
			// 	hitType: 'pageView',
			// 	page: pathname,
			// 	user: this.sessionId
			// });
			this.ga.trackView(pathname);
			//this.ga.setVar('dp', pathname);
			//this.ga.trackEvent('page', 'view', pathname);
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
			console.log('analytics disabled');
			return;
		}
		if (this.sessionId) {
			console.log('stopping session');
			//this.ga('send', 'pageview', {'sessionControl': 'end'});
			//this.ga('set', 'userId', '');
			this.sessionId = undefined;
			this.ga.setVar('sc', 'end');
			this.ga.setUserId(this.sessionId);
		}
	}

}
