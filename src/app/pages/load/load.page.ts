import { environment } from './../../../environment/environment';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// import { APIService } from '../../core/api/api.service';
import { PassivePage } from '../passive/passive.page';
import { SetupPage } from '../setup/setup.page';
import { NavService } from '../../core/nav/nav.service';
import { ReloadService } from '../../core/reload/reload.service';


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
		public navCtrl: NavController,
		public navService: NavService,
		public reloadService: ReloadService,
		private storage: Storage
	) {}

	ionViewWillEnter() {
		this.navService.options.visible = false;
		this.navService.options.showLogo = false;

		this.checkForUndefinedInputs(environment.setupInputs)
			.then((undefinedInputs) => {
				console.log(undefinedInputs);

				if (undefinedInputs > 0) {
					this.goToSetup();
				} else {
					this.goToPassive();
				}
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
		this.navCtrl.push(PassivePage);
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
