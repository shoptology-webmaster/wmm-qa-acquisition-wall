import { SlidesService } from './../../shared/slides.service';
import { ChooseSlidePage } from './../choose-slide/choose-slide.page';
import { Exhibit } from './../../core/exhibit/exhibit.model';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

import { NavService } from '../../core/nav/nav.service';
import { AnalyticsService } from '../../core/analytics';

/**
 * Handles session start/stop and path selection.
 *
 * @export
 * @class PassiveComponent
 */
@Component({
	selector: 'ko-exhibit',
	templateUrl: './exhibit.page.html'
})
export class ExhibitPage {
	@ViewChild(Slides) slides: Slides;

	public exhibit: Exhibit;
	public currentIndex: number = 1;
	public nextToMenu: boolean = false;

	constructor(
		private navCtrl: NavController,
		private navService: NavService,
		private navParams: NavParams,
		private analyticsService: AnalyticsService,
		private slidesService: SlidesService
	) {}

	ionViewWillEnter() {
		this.navService.options.visible = true;
		this.navService.options.showHome = true;
		this.navService.options.showAccessibilityMode = false;

		if (this.navParams.get('exhibit')) {
			this.exhibit = this.navParams.get('exhibit');
		}
	}

	ionViewDidEnter() {
		this.slidesService.setCurrentSlide(0);
	}

	nextSlide() {
		this.slides.slideNext();
	}

	slideChanged() {
		this.currentIndex = this.slides.getActiveIndex();
		this.slidesService.setCurrentSlide(this.currentIndex);

		if (this.currentIndex >= this.slides.length() - 1) {
			this.nextToMenu = true;
		} else {
			this.nextToMenu = false;
		}
	}

	goToMenu() {
		this.navCtrl.push(ChooseSlidePage);
	}

}
