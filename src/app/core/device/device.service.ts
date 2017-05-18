import { Storage } from '@ionic/storage';
import { environment } from './../../../environment/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

/**
 * Service for accessing or setting any device-level informatino or configuration.
 *
 * @export
 * @class DeviceService
 */
@Injectable()
export class DeviceService {

	constructor(
		private http: Http,
		private storage: Storage
	) {}

	/**
	 * Queries the application server to see if the package version
	 * matches the version in the environment file.
	 *
	 * @returns {Observable<boolean>}
	 *
	 * @memberOf DeviceService
	 */
	public isUpToDate(): Observable<boolean> {
		if (!environment.production) {
			return Observable.of(true);
		} else {
			return this.http.get('/version')
				.map((result) => result.json())
				.map((data) => {
					console.log(environment.version, data.version);

					if (environment.version !== data.version) {
						return false;
					} else {
						return true;
					}
				});
		}
	}

	/**
	 * Get the current store number or 0 if it doesn't exist yet
	 *
	 * @returns {number}
	 *
	 * @memberOf DeviceService
	 */
	public getKioskNumber(): Promise<number> {
		return this.storage.get('kioskNumber')
			.then((kioskNumber) => {
				if (kioskNumber) {
					return parseInt(kioskNumber, 10);
				} else {
					// TODO: Send error to crash reporting
					return 0;
				}
			});
	}

	/**
	 * Append and image with our proxy url, unless we are in dev
	 *
	 * @param {string} url
	 * @returns {string}
	 *
	 * @memberOf DeviceService
	 */
	public getImageWithProxy(url: string): string {
		let address = url;

		if (environment.useProxy) {
			address = environment.apiUrl + '/' + 'proxy';

			if (url) {
				address += '?url=' + url;
			}
		}

		return address;
	}
}
