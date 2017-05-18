import { environment } from './../../../environment/environment';
import { Injectable, Inject, forwardRef } from '@angular/core';

import { DeviceService } from '../device/device.service';
import { APIService } from '../api/api.service';

@Injectable()
export class AnalyticsTimerService {
	public timers: Object = {};
	public sampleSize: number = environment.timerSampleSize;
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
	 * Store our properties for the timing and start a timer
	 *
	 * @param {string} category
	 * @param {string} variable
	 * @param {string} [label]
	 * @returns {string}			The name of the timer
	 *
	 * @memberOf AnalyticsTimerService
	 */
	public start(category: string, variable: string, label?: string): string {
		let timeStart = (new Date()).getTime();
		let name = category + variable;

		this.timers[name] = {
			category: category,
			variable: variable,
			label: label,
			timeStart: timeStart
		};

		return name;
	}


	/**
	 * Stop the timer
	 *
	 * @param {string} name				Name of the timer
	 * @param {boolean} dontSendTiming	If you don't want an event to be sent, such as if the call failed
	 * @returns {(number | boolean)}
	 *
	 * @memberOf AnalyticsTimerService
	 */
	public stop(name: string, dontSendTiming?: boolean): number | boolean {
		let timer = this.timers[name];
		if (!timer) {
			return false;
		}

		// Figure out what our timing was
		let timeEnd = (new Date()).getTime();
		let time: number = timeEnd - timer.timeStart;

		// Send an analytics event
		if (!dontSendTiming) {
			this.sendTiming(timer.category, timer.variable, time, timer.label);
		}

		// Remove the timer reference
		delete this.timers[name];

		return time;
	}

	/**
	 * Send Google Analytics a Timing Event
	 *
	 * @param {string} category
	 * @param {string} variable
	 * @param {number} val
	 * @param {string} [label]
	 *
	 * @memberOf AnalyticsTimerService
	 */
	private sendTiming(category: string, variable: string, val: number, label?: string): void {
		let obj: any = {
			trackingId: environment.googleAnalyticsId,
			eventCategory: category,
			eventVariable: variable,
			eventTiming: val,
			user: '',
			extra: {
				cd1: this.kioskNumber
			}
		};

		if (label) {
			obj.eventLabel = label;
		}

		// Only call api if we hit the random sample size
		let n: number = Math.random() * 100;
		if (this.sampleSize && n > this.sampleSize) {
			return;
		}
		this.apiService.sendTiming(obj).subscribe();
	}
}
