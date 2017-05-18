import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CrashReportingServiceMock {
	public captureBreadCrumb(message: string, category?: string, level: string = 'info'): void {
		return;
	}

	public captureMessage(message: string, options?: Object): void {
		return;
	}

	public captureException(error: Error, options?: Object): void {
		return;
	}

	public setUserContext(user: Object): Object {
		return {};
	}

	public setExtraContext(obj: Object): Object {
		return {};
	}

	public transportToRaven(options): void {
		return;
	}
}
