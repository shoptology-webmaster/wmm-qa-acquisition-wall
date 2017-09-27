import { ChooseSlidePage } from './../../pages/choose-slide/choose-slide.page';
import { environment } from './../../../environment/environment';
import { Component, Input } from '@angular/core';

import { NavService } from './nav.service';
import { NavController } from 'ionic-angular';

/**
 * Controls the top-level navigation interface for moving between pages
 *
 * @export
 * @class NavComponent
 */
@Component({
	selector: 'ko-navbar',
	templateUrl: './nav.component.html'
})
export class NavComponent {
	@Input() navCtrl: NavController;

	constructor(
		private navService: NavService
	) {}

	ngAfterViewInit() {
		// Watch for all view changes
		this.navCtrl.viewDidEnter.subscribe((view) => {
			if (environment.pageViewReportBlacklist && environment.pageViewReportBlacklist.indexOf(view.component.name) === -1) {
				//this.analyticsService.sendPageview(view.component.name);
			}
		});

		this.navService.onGoBack
			.subscribe(() => {
				this.goBack();
			});

		this.navService.onGoHome
			.subscribe(() => {
				this.goHome();
			});
	}

	/**
	 * Go back through Ionic History.
	 *
	 * @returns {void}
	 *
	 * @memberOf NavComponent
	 */
	public goBack(): void {
		if (this.navCtrl.isTransitioning() || !this.navCtrl.canGoBack()) {
			return;
		}

		// Emit Event
		this.navService.tappedBack();


		if (this.navService.options.disableBack) {
			return;
		}

		// Put this in front to make sure we get before changing via navCtrl
		let view = this.navCtrl.getActive();
		this.navCtrl.pop();
		if (this.navService.isSearchModalOpen) {
			this.navService.hideSearchModal();
		}
		//this.analyticsService.sendEvent(view.component.name, 'tap', 'Back');
	}

	/**
	 * Go back to the home page.
	 *
	 * @returns {void}
	 *
	 * @memberOf NavComponent
	 */
	public goHome(): void {
		if (this.navCtrl.isTransitioning()) {
			return;
		}

		// Emit event
		this.navService.tappedHome();

		if (this.navService.options.disableHome) {
			return;
		}

		let view = this.navCtrl.getActive();
		this.navCtrl.pop();
		// this.navCtrl.push(ChooseSlidePage, {}, {
		// 	direction: 'back'
		// });
		if (this.navService.isSearchModalOpen) {
			this.navService.hideSearchModal();
		}
		//this.analyticsService.sendEvent(view.component.name, 'tap', 'Home');
	}

	/**
	 * Turn the search modal on or off
	 *
	 * @returns {void}
	 *
	 * @memberOf NavComponent
	 */
	public toggleSearch(): void {
		let view = this.navCtrl.getActive();

		if (this.navService.isSearchModalOpen) {
			this.navService.hideSearchModal();
			//this.analyticsService.sendEvent(view.component.name, 'tap', 'Search - Hide');
		} else {
			this.navService.showSearchModal();
			//this.analyticsService.sendEvent(view.component.name, 'tap', 'Search - Show');
		}
	}

	/**
	 * Turn accessibility mode on or off
	 *
	 * @returns {void}
	 *
	 * @memberOf NavComponent
	 */
	public toggleAccessibilityMode(): void {
		if (this.navService.accessibilityMode) {
			this.navService.setAccessibilityMode(false);
		} else {
			this.navService.setAccessibilityMode(true);
		}
	}

}
