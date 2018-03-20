import { SetupPage } from './../setup/setup.page';
import { ExhibitService } from './../../core/exhibit/exhibit.service';
import { Observable } from 'rxjs';
import { KioskData, ExhibitState, Company } from './../../core/exhibit/exhibit.model';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NavService } from '../../core/nav/nav.service';
import { AnalyticsService } from '../../core/analytics';
import { ExhibitPage } from './../exhibit/exhibit.page';

/**
 * Handles session start/stop and path selection.
 *
 * @export
 * @class PassiveComponent
 */
@Component({
	selector: 'ko-choose-slide',
	templateUrl: './choose-slide.page.html'
})
export class ChooseSlidePage {
	public kioskData: Observable<KioskData>;
	public accessibilityMode: boolean = false;
	public setup: {one: boolean, two: boolean} = {
		one: false,
		two: false
	}

	constructor(
		private navCtrl: NavController,
		private navService: NavService,
		private analyticsService: AnalyticsService,
		private exhibitService: ExhibitService
	) {}

	ionViewWillEnter() {
		this.navService.setAccessibilityMode(true);
		this.navService.options.visible = true;
		this.navService.options.showHome = false;
		this.navService.setAccessibilityMode(true);

		this.kioskData = this.exhibitService.select('KioskData');

		this.analyticsService.sendPageview('/choose-slide');
	}

	toggleAccessibility() {
		this.accessibilityMode = !this.accessibilityMode;
	}

	goToExhibit(company: Company, kioskData: KioskData) {
		this.analyticsService.sendEvent('nav', 'click', company.CompanyName);

		this.navCtrl.push(ExhibitPage, {
			exhibit: company,
			textNumber: kioskData.TextNumber
		});
	}

	goToSetup() {
		this.navCtrl.push(SetupPage);
	}

}
