import { environment } from './../../../environment/environment';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

/**
 * Service for reloading the kiosk web page.
 *
 * @export
 * @class DeviceService
 */
@Injectable()
export class ReloadService {

	public timer: Subscription;
	public delay: number;

	constructor() {
		this.delay = (environment.inactiveTimeBeforeUpdating * 60) * 1000;
	}

	/**
	 * Starts a countdown toward restarting the application.
	 *
	 * @returns {Subscription}
	 *
	 * @memberOf ReloadService
	 */
	public startTimer(delay?: number): Subscription {
		if (typeof delay === 'undefined') {
			delay = this.delay;
		}
		return this.timer = Observable.interval(delay)
			.subscribe(data => {
				this.reloadApp();
			});
	}

	/**
	 * Cancels the reset countdown.
	 *
	 * @returns {void}
	 *
	 * @memberOf ReloadService
	 */
	public stopTimer(): void {
		if (this.timer) {
			this.timer.unsubscribe();
		}
	}

	/**
	 * Restarts the reset countdown.
	 *
	 * @returns {Subscription}
	 *
	 * @memberOf ReloadService
	 */
	public resetTimer(): Subscription {
		this.timer.unsubscribe();
		return this.startTimer();
	}

	/**
	 * Reload the application.
	 *
	 * @returns {void}
	 *
	 * @memberOf ReloadService
	 */
	public reloadApp(): void {
		// Make sure the crash report can get out
		setTimeout(() => {
			location.reload(true);
		}, 1000);
	}
}
