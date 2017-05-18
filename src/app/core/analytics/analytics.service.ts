import { environment } from './../../../environment/environment';
import { Subscription } from 'rxjs';
import { Injectable, Inject, forwardRef } from '@angular/core';

import { DeviceService } from '../device/device.service';
import { APIService } from '../api/api.service';


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
		// Make sure to forward the reference of APIService in case it doesnt exist yet
		@Inject(forwardRef(() => APIService))
		private apiService: APIService,
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
		if (!this.sessionId) {
			this.sessionId = Date.now().toString();
			this.sendEvent('session', 'start', undefined, undefined, {
				sc: 'start',
				cd1: this.kioskNumber
			});
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
			trackingId: environment.googleAnalyticsId,
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
			this.apiService.sendEvent(obj).subscribe();
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
		let obj: any = {
			trackingId: environment.googleAnalyticsId,
			eventPath: pathname,
			user: this.sessionId,
			extra: {
				cd1: this.kioskNumber
			}
		};

		if (environment.analytics) {
			this.subscription = this.apiService.sendPageview(obj).subscribe(() => {
				this.subscription.unsubscribe();
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
		if (this.sessionId) {
			this.sendEvent('session', 'end', undefined, undefined, {
				sc: 'end',
				cd1: this.kioskNumber
			});
			this.sessionId = undefined;
		}
	}

}
