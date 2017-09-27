import { PassivePage } from './../../pages/passive/passive.page';
import { environment } from './../../../environment/environment';
import { Component, HostListener, Input } from '@angular/core';
import { NavController, Alert, AlertController } from 'ionic-angular';
import { fadeInOut } from '../animations';

import { Observable, Subscription } from 'rxjs';

/**
 * Controls the Timeout Modal
 * Modal should countdown the time between user interactions and pop up to ask if the user
 * is still around.  After another countdown, the modal should reset back to the Passive screen.
 *
 * @export
 * @class TimeoutComponent
 */
@Component({
	selector: 'ko-timeout',
	templateUrl: './timeout.component.html',
	animations: [
		fadeInOut('fadeInOut')
	]
})
export class TimeoutComponent {
	@Input() navCtrl: NavController;

	public alert: Alert;
	public buttonText: string;
	public countdown: Subscription;
	public countdownDelay: number;
	public currentCountdownNumber: number;
	public delay: number;
	public excludedPages: Array<any> = [];
	public message: string;
	public timer: Subscription;
	public title: string;
	public showModal: boolean = false;

	// Listen for any click event to reset our timer
	@HostListener('document:touchstart', ['$event.target'])
	@HostListener('document:click', ['$event.target'])
	public onClick(targetElement) {
		this.resetTimer();
	}

	constructor(
		private alertCtrl: AlertController
	) {}

	ngAfterViewInit() {
		this.countdownDelay = environment.timeoutComponentConfig.countdown * 1000 || 15000;
		this.delay = environment.timeoutComponentConfig.delay * 1000 || 120000;
		this.message = environment.timeoutComponentConfig.message || '<p>Are you still using this app?</p>';
		this.title = environment.timeoutComponentConfig.title || 'Still Using this app?';
		this.buttonText = environment.timeoutComponentConfig.buttonText || 'Yes';

		if (environment.timeoutComponentConfig.excludedPages) {
			this.excludedPages = environment.timeoutComponentConfig.excludedPages;
		}

		// Reset the timer on page changes
		this.navCtrl.viewDidEnter.subscribe((view) => {
			this.resetTimer();
		});

		this.startTimer();
	}

	/**
	 * Returns the user to the passive screen.
	 *
	 * @returns {void}
	 *
	 * @memberOf TimeoutComponent
	 */
	public goToPassive(): void {
		if(this.timer) {
			this.timer.unsubscribe();
		}
		this.navCtrl.popToRoot();
	}

	/**
	 * Hides the timeout alert modal.
	 *
	 * @param {boolean} [resetTimer]
	 *
	 * @returns {void}
	 *
	 * @memberOf TimeoutComponent
	 */
	public hideAlert(resetTimer?: boolean): void {
		if (resetTimer) {
			this.stopCountdown();
			this.resetTimer();
		}
		//console.log('hiding modal');
		this.showModal = false;
	}

	/**
	 * Resets the timer.
	 *
	 * @returns {Subscription}
	 *
	 * @memberOf TimeoutComponent
	 */
	public resetTimer(): Subscription {
		this.timer.unsubscribe();
		return this.startTimer();
	}

	/**
	 * Shows the alert modal.
	 *
	 * @returns {void}
	 *
	 * @memberOf TimeoutComponent
	 */
	public showAlert(): void {
		this.timer.unsubscribe();
		this.showModal = true;

		//console.log('showModal=', this.showModal);

		this.startCountdown();
	}

	/**
	 * Starts the interior modal countdown.
	 *
	 * @returns {Subscription}
	 *
	 * @memberOf TimeoutComponent
	 */
	public startCountdown(): Subscription {
		if (this.countdown) {
			this.countdown.unsubscribe();
		}

		this.currentCountdownNumber = this.countdownDelay / 1000;
		this.countdown = Observable.interval(1000)
			.subscribe(data => {
				this.currentCountdownNumber--;
				if (this.currentCountdownNumber <= 0) {
					this.hideAlert(true);
					this.goToPassive();
					this.stopCountdown();
				}
			});

		return this.countdown;
	}

	/**
	 * Starts the countdown to show the modal.
	 *
	 * @returns {Subscription}
	 *
	 * @memberOf TimeoutComponent
	 */
	public startTimer(): Subscription {
		//console.log('starting timer');
		if (this.timer) {
			//console.log('clearing old timer first');
			this.timer.unsubscribe();
		}

		return this.timer = Observable.interval(this.delay)
			.subscribe(data => {
				if (this.shouldShowAlert()) {
					//console.log('Should show alert');
					this.showAlert();
				}
			});
	}

	/**
	 * Stops and clears the timer.
	 *
	 * @returns {void}
	 *
	 * @memberOf TimeoutComponent
	 */
	public stopTimer(): void {
		//console.log('stopping timer');
		this.timer.unsubscribe();
	}

	/**
	 * Sops and clears the countdown.
	 *
	 * @returns {void}
	 *
	 * @memberOf TimeoutComponent
	 */
	public stopCountdown(): void {
		this.countdown.unsubscribe();
	}

	/**
	 * Only show our alert if we are not on the passive screens
	 *
	 * @private
	 * @returns {boolean}
	 *
	 * @memberOf TimeoutComponent
	 */
	private shouldShowAlert(): boolean {
		if (this.navCtrl) {
			let view = this.navCtrl.getActive();
			let onExcludedPage = false;

			// If no view exists lets make sure to push to Passive
			if (!view) {
				return true;
			}

			// Dont show alert if we are on an excludedPage
			this.excludedPages.forEach((pageName) => {
				if (view.component.name === pageName) {
					onExcludedPage = true;
				}
			});

			if (onExcludedPage) {
				return false;
			}

		}

		return true;
	}
}
