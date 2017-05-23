import { ExhibitService } from './../../core/exhibit/exhibit.service';
import { Observable } from 'rxjs';
import { Exhibit } from './../../core/exhibit/exhibit.model';
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

	public exhibits: Observable<Exhibit[]>;
	public accessibilityMode: boolean = false;

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

		this.exhibits = this.exhibitService.select('exhibits');

		this.analyticsService.sendPageview('/choose-slide');
	}

	toggleAccessibility() {
		this.accessibilityMode = !this.accessibilityMode;
	}

	goToExhibit(exhibit: Exhibit) {
		this.analyticsService.sendEvent('nav', 'click', exhibit.name);

		this.navCtrl.push(ExhibitPage, {
			exhibit: exhibit
		});
	}

}
