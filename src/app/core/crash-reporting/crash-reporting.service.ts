import { environment } from './../../../environment/environment';
import { Injectable, ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';

import { DeviceService } from '../device/device.service';

// Configure and initialize Sentry / Raven outside of class in case of errors
Raven
	.config(environment.sentryProject, {
		release: environment.version,
		ignoreUrls: [
			/sendReport/i,
			// Chrome extensions
			/extensions\//i,
			/^chrome:\/\//i
		],
		ignoreErrors: [
			'Response with status: 0  for URL: null'
		]
	})
	.install();

Raven.setTagsContext({
	environment: (environment.production ? 'production' : 'dev')
});

/**
 * Used to report errors or debug messaging to Sentry for debugging.
 * Check http://sentry.io for more information.
 *
 * @export
 * @class CrashReportingService
 */
@Injectable()
export class CrashReportingService {

	constructor(
		private deviceService: DeviceService
	) {
		// Reenable if we need a proxy
		// Raven.setTransport( (options) => {
		// 	this.transportToRaven(options);
		// });
		this.captureMessage('Starting Up');
	}

	/**
	 * Capture a breadcrumb event
	 *
	 * @param {string} message
	 * @param {string} [category]
	 * @param {string} [level='info']
	 *
	 * @returns {void}
	 *
	 * @memberOf CrashReportingService
	 */
	public captureBreadCrumb(message: string, category?: string, level: string = 'info'): void {
		let bc = {
			message: message,
			category: category || 'general',
			level: level
		};
		Raven.captureBreadcrumb(bc);
	}

	/**
	 * Log a message
	 *
	 * @param {string} message
	 * @param {Object} [options]
	 *
	 * @returns {void}
	 *
	 * @memberOf CrashReportingService
	 */
	public captureMessage(message: string, options?: Object): void {
		Raven.captureMessage(message, options);
	}

	/**
	 * Log an exception
	 *
	 * @param {Error} error
	 * @param {Object} [options]
	 *
	 * @returns {void}
	 *
	 * @memberOf CrashReportingService
	 */
	public captureException(error: Error, options?: Object): void {
		Raven.captureException(error, options);
	}

	/**
	 * Set the user for this session
	 *
	 * @param {Object} user
	 *
	 * @returns {Object}
	 *
	 * @memberOf CrashReportingService
	 */
	public setUserContext(user: Object): Object {
		return Raven.setUserContext(user);
	}

	/**
	 * Set any extra contexts for our messages and errors
	 *
	 * @param {Object} obj
	 *
	 * @returns {Object}
	 *
	 * @memberOf CrashReportingService
	 */
	public setExtraContext(obj: Object): Object {
		return Raven.setExtraContext(obj);
	}

	/**
	 * Configure Raven to send errors to our API
	 *
	 * @param {any} options
	 *
	 * @returns {void}
	 *
	 * @memberOf CrashReportingService
	 */
	public transportToRaven(options): void {
		let url: string = options.url;
		url += '?sentry_version=' + options.auth.sentry_version;
		url += '&sentry_client=' + options.auth.sentry_client;
		url += '&sentry_key=' + options.auth.sentry_key;

		let params = {
			data: options.data,
			url: url
		};

		if (typeof params.data.tags === 'undefined') {
			params.data.tags = {};
		}

		this.deviceService.getKioskNumber()
			.then((kioskNumber) => {
				params.data.tags = Object.assign(params.data.tags, {
					kioskNumber: kioskNumber
				});

				if (environment.crashReporting) {
					//this.apiService.sendReport(params).subscribe();
				}
			})
	}
}

/**
 * Override the default ErrorHandler to capture and send issues to Sentry
 *
 * @export
 * @class CrashReportingErrorHandler
 * @implements {ErrorHandler}
 */
export class CrashReportingErrorHandler implements ErrorHandler {
	handleError(err: any): void {
		if (typeof err.message !== 'undefined') {
			Raven.captureException(err.originalError);

			// Log to the console.
			try {
				console.group( 'ErrorHandler' );
				console.error( err.message );
				console.error( err.stack );
				console.groupEnd();
			} catch ( handlingError ) {
				console.group( 'ErrorHandler' );
				console.warn( 'Error when trying to output error.' );
				console.error( handlingError );
				console.groupEnd();
			}
		}
	}
}
