import { environment } from './../../../environment/environment';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController } from 'ionic-angular';
import { PassivePage } from '../passive/passive.page';
import { LoadPage } from '../load/load.page';

/**
 * Allows the user to enter any data required for running the application.
 *
 * @export
 * @class SetupPage
 */
@Component({
	selector: 'ko-setup',
	templateUrl: './setup.page.html'
})
export class SetupPage {

	public inputs: Array<any>;
	public model: Object = {};
	public env = environment;

	constructor(
		private navCtrl: NavController,
		private storage: Storage
	) {}

	ionViewWillEnter() {
		this.inputs = environment.setupInputs;
		this.getCurrentValues();
	}

	/**
	 * Load any stored values from localStorage.
	 *
	 * @returns {void}
	 *
	 * @memberOf SetupPage
	 */
	public getCurrentValues(): void {
		this.inputs.forEach((input) => {
			this.storage.get(input.name)
				.then((val) => {
					this.model[input.name] = val || '';
				});
		});
	}

	/**
	 * Writes values to localStorage and sends the user to the passive screen.
	 *
	 * @param {Event} event
	 *
	 * @returns {void}
	 *
	 * @memberOf SetupPage
	 */
	public save(event: Event): void {
		event.preventDefault();

		Object.keys(this.model).forEach((key) => {
			let val = this.model[key];
			this.storage.set(key, val);
		});

		//this.goToPassive();
		this.goToLoad();
	}

	/**
	 * Navigate to the load screen.
	 *
	 * @returns {void}
	 *
	 * @memberOf SetupPage
	 */
	public goToLoad(): void {
		this.navCtrl.setRoot(LoadPage);
	}

	/**
	 * Navigate to the passive screen.
	 *
	 * @returns {void}
	 *
	 * @memberOf SetupPage
	 */
	public goToPassive(): void {
		this.navCtrl.setRoot(PassivePage);
	}

}
