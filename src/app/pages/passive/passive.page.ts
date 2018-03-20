import { HeartbeatService } from './../../core/heartbeat/heartbeat.service';
import { Storage } from '@ionic/storage';
import { ChooseSlidePage } from './../choose-slide/choose-slide.page';
import { Component, ViewChild, ContentChildren, ElementRef } from '@angular/core';
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
	@ViewChild('loopVideo') loopVideo: ElementRef
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

	constructor(
		private navCtrl: NavController,
		private navService: NavService,
		private analyticsService: AnalyticsService,
		private crashReportingService: CrashReportingService,
		private reloadService: ReloadService,
		private deviceService: DeviceService,
		private storage: Storage,
		private heartbeatService: HeartbeatService
	) {}

	ionViewWillEnter() {
		this.navService.setAccessibilityMode(false);
	}

	ionViewDidEnter() {
		// If we haven't configured the root page, set it up
		// mark it as set in navService
		this.reset();
		this.reloadService.startTimer();

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
			.then((num) => {
				if (
					num
					&& num < 4
					&& num > 0)
				{
					num--;
				} else {
					num = 0;
				}

				if(this.videoUrl !== this.videoUrls[num]) {
					this.videoUrl = this.videoUrls[num];
				}

				this.kioskNumber = num;

				try {
					this.loopVideo.nativeElement.currentTime = 0;
					this.loopVideo.nativeElement.play();
					// this.loopVideos.forEach((lv) => {
					// 	lv.nativeElement.currentTime = 0;
					// 	lv.nativeElement.pause()
					// });
				} catch(err) {
					console.log(err);
				}

				this.heartbeatService.start('WMM Acquisition', num);
			});
	}

	ionViewWillLeave() {
		this.reloadService.stopTimer();
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
		// this.loopVideos.forEach((lv) => { lv.nativeElement.pause() });
		this.loopVideo.nativeElement.pause();
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
