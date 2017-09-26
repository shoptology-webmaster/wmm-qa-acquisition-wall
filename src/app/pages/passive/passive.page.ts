import { Storage } from '@ionic/storage';
import { ChooseSlidePage } from './../choose-slide/choose-slide.page';
import { Component, ViewChildren, ContentChildren, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NavService } from '../../core/nav/nav.service';
import { AnalyticsService } from '../../core/analytics';
import { CrashReportingService } from '../../core/crash-reporting/crash-reporting.service';
import { ReloadService } from './../../core/reload/reload.service';
import { DeviceService } from './../../core/device/device.service';

/**
 * Plays Video loop
 *
 * @export
 * @class PassiveComponent
 */
@Component({
	selector: 'ko-passive',
	templateUrl: './passive.page.html'
})
export class PassivePage {
	@ViewChildren('loopVideo') loopVideos;
	// @ViewChild('loopVideo1') loopVideo1: ElementRef;
	// @ViewChild('loopVideo2') loopVideo2: ElementRef;
	// @ViewChild('loopVideo3') loopVideo3: ElementRef;

	public videoUrl: string = '';
	public kioskNumber: Number = 1;
	public videoUrls: string[] = [
		'assets/videos/wm-moosejaw.mp4',
		'assets/videos/shoes-haystack.mp4',
		'assets/videos/jet-modcloth.mp4',
	];

	private loopVideo: ElementRef;

	constructor(
		private navCtrl: NavController,
		private navService: NavService,
		private analyticsService: AnalyticsService,
		private crashReportingService: CrashReportingService,
		private reloadService: ReloadService,
		private deviceService: DeviceService,
		private storage: Storage
	) {}

	ionViewWillEnter() {
		this.navService.setAccessibilityMode(false);
	}

	ionViewDidEnter() {
		// If we haven't configured the root page, set it up
		// mark it as set in navService
		this.reset();

		// this.deviceService.isUpToDate()
		// 	.subscribe((result) => {
		// 		// console.log('Is up to date?', result);
		// 		if (!result) {
		// 			console.log('Version mismatch. Update required.');
		// 			this.reloadService.startTimer(30000);
		// 		} else {
		// 			this.reloadService.startTimer();
		// 		}
		// 	}, (err) => {
		// 		console.log('Error when asking if up to date', err);
		// 		this.reloadService.startTimer();
		// 	});

		this.navService.options.visible = false;

		// Find the right video to play
		this.storage.get('kioskNumber')
			.then((kioskNumber) => {
				if (
					kioskNumber
					&& kioskNumber < 4
					&& kioskNumber > 0)
				{
					kioskNumber--;
				} else {
					kioskNumber = 0;
				}
				this.kioskNumber = kioskNumber;
				console.log(kioskNumber);
				try {
					console.log('here we are');
					console.log(this.loopVideos);
					this.loopVideos.forEach((lv) => {
						console.log(lv.nativeElement);
						lv.nativeElement.play();
					});
					//this.loopVideo.nativeElement.play();
				} catch(err) {
					console.log(err);
				}
			});
	}

	ionViewWillLeave() {

	}


	/**
	 * Go to the Find path pages.
	 *
	 * @returns {void}
	 *
	 * @memberOf PassiveComponent
	 */
	public goToChooseSlide(): void {
		this.crashReportingService.setUserContext({
			id: Date.now().toString()
		});
		this.analyticsService.startSession();
		this.analyticsService.sendEvent('Passive', 'tap', 'GoToChooseSlide');
		this.reloadService.stopTimer();
		this.loopVideos.forEach((lv) => { lv.nativeElement.pause() });
		this.navCtrl.push(ChooseSlidePage);
	}


	/**
	 * Reset the application state to make way for a new session.
	 *
	 * @returns {void}
	 *
	 * @memberOf PassiveComponent
	 */
	public reset(): void {
		this.analyticsService.stopSession();
	}

}
