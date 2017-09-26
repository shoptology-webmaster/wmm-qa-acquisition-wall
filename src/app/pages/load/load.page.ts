import { environment } from './../../../environment/environment';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';


// import { APIService } from '../../core/api/api.service';
import { PassivePage } from '../passive/passive.page';
import { SetupPage } from '../setup/setup.page';
import { NavService } from '../../core/nav/nav.service';
import { ReloadService } from '../../core/reload/reload.service';
import { CrashReportingService } from '../../core/crash-reporting/crash-reporting.service';


/**
 * Handle any bootstraping or data-gathering before the app can start.
 *
 * @export
 * @class LoadComponent
 */
@Component({
	selector: 'ko-load',
	templateUrl: './load.page.html'
})
export class LoadPage {

	constructor(
		// public apiService: APIService,
		public platform: Platform,
		public navCtrl: NavController,
		public navService: NavService,
		public reloadService: ReloadService,
		private storage: Storage,
		private crashReportingService: CrashReportingService
	) {}

	ionViewWillEnter() {
		this.navService.options.visible = false;
		this.navService.options.showLogo = false;


		// this.checkForUndefinedInputs(environment.setupInputs)
		// 	.then((undefinedInputs) => {
		// 		console.log(undefinedInputs);

		// 		if (undefinedInputs > 0) {
		// 			this.goToSetup();
		// 		} else {
		// 			this.goToPassive();
		// 		}
		// 	});


		this.platform.ready().then(() => {
			this.loadTags()
				.then((tags) => {
					return this.insertTags(tags);
				})
				.then(() => {
					return this.checkForUndefinedInputs(environment.setupInputs);
				})
				.then((undefinedInputs) => {
					console.log(undefinedInputs);

					if (undefinedInputs > 0) {
						this.goToSetup();
					} else {
						this.goToPassive();
					}
				});
		});




		// if (environment.serviceWorkers) {
		// 	navigator.serviceWorker.register('./service-worker.js', {
		// 		scope: './'
		// 	})
		// 	.then(this.waitUntilInstalled)
		// 	.then(() => {
		// 		// this.getConfigParams();
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 		this.reloadService.reloadApp();
		// 	});
		// } else {
		// 	// this.getConfigParams();
		// }
	}

	/**
	 * Go to the setup configuration page.
	 *
	 * @params {void}
	 *
	 * @returns {void}
	 *
	 * @memberOf LoadComponent
	 */
	goToSetup(): void {
		this.navCtrl.push(SetupPage);
	}

	/**
	 * Go to the passive screen.
	 *
	 * @params {void}
	 *
	 * @returns {void}
	 *
	 * @memberOf LoadComponent
	 */
	goToPassive(): void {
		this.navCtrl.setRoot(PassivePage);
	}

	/**
	 * Adds tags from the device to storage
	 *
	 * @param tags
	 */
	insertTags(tags) {
		return new Promise((resolve, reject) => {
			// TODO: If we need to load multiple tags,
			// add a loop here


			if(tags.customfield) {
				if(tags.customfield.KIOSK_NUMBER) {
					this.storage.set('kioskNumber', tags.customfield.KIOSK_NUMBER)
						.then(() => {
							this.crashReportingService.captureMessage('Kiosk ' + tags.customfield.KIOSK_NUMBER + ' starting up.', {
								data: {
									tags: {
										kiosk: tags.customfield.KIOSK_NUMBER
									}
								}
							});
							resolve();
						});
				} else {
					resolve();
				}
			} else {
				resolve();
			}
		});

	}

	/**
	 * Loads tags from the device's storage.
	 *
	 * @returns {Promise<any>}
	 * @memberof LoadPage
	 */
	loadTags(): Promise<any> {
		return new Promise((resolve, reject) => {
			if(window['cordova']) {
				window['resolveLocalFileSystemURL'](window['cordova'].file.externalRootDirectory + 'agent/', (dir) => {
					dir.getFile('tags', {
						create: false
					}, (fileEntry) => {
						fileEntry.file(function(file) {
							var reader = new FileReader();

							reader.onloadend = function() {
								// Parse all lince into keys in an array
								var settingsArr = this.result.match(/[^\r\n]+/g),
									settings = {};

								// Run through each array item and parse as needed
								settingsArr.forEach(function(v, k) {
									var d = v.split('=');

									// If the key has a period, parse it into a valid object
									if (d[0].indexOf('.') !== -1) {
										var innerKey1 = d[0].split('.')[0],
											innerKey2;

										if (typeof settings[innerKey1] === 'undefined') {
											settings[innerKey1] = {};
										}

										if (typeof d[0].split('.')[1] !== 'undefined') {
											innerKey2 = d[0].split('.')[1];

											if (typeof settings[innerKey1][innerKey2] === 'undefined') {
												settings[innerKey1][innerKey2] = {};
											}

											settings[innerKey1][innerKey2] = decodeURIComponent(d[1]);
										} else {
											settings[innerKey1] = decodeURIComponent(d[1]);
										}
									} else {
										settings[d[0]] = decodeURIComponent(d[1]);
									}

									resolve(settings);
								});

								console.log('------------------');
								console.log('GOT CONFIG');
								console.log(settings);
								console.log('------------------');
							};

							reader.readAsText(file);
						});
					}, (err) => {
						resolve({});
					});
				}, (err) => {
					resolve({});
				});
			} else {
				resolve({});
			}
		});
	}

	/**
	 * Check to see if the user needs to enter some config data.
	 *
	 * @returns {number}
	 *
	 * @memberOf LoadComponent
	 */
	checkForUndefinedInputs(inputs): Promise<number> {
		let undefinedInputs = 0;

		return this.storage.keys()
			.then((keys) => {
				inputs.forEach((input) => {
					if (keys.indexOf(input.name) < 0) {
						undefinedInputs++;
					}
				});

				return undefinedInputs;
			});
	}

	/**
	 * Promise to wait for service workers to be installed.
	 *
	 * @param {any} registration
	 * @returns {Promise<any>}
	 *
	 * @memberOf LoadComponent
	 */
	waitUntilInstalled(registration): Promise<any> {
		return new Promise(function(resolve, reject) {
			if (registration.installing) {
				// If the current registration represents the "installing" service worker, then wait
				// until the installation step (during which the resources are pre-fetched) completes
				// to display the file list.
				registration.installing.addEventListener('statechange', function(e) {
					if (e.target.state === 'installed') {
						resolve();
					} else if (e.target.state === 'redundant') {
						reject();
					}
				});
			} else {
				// Otherwise, if this isn't the "installing" service worker, then installation must have been
				// completed during a previous visit to this page, and the resources are already pre-fetched.
				// So we can show the list of files right away.
				resolve();
			}
		});
	}
}
