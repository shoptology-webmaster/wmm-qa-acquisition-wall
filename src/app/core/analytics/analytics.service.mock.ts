import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AnalyticsServiceMock {

	public startSession(forceNewSession?: boolean): void {
		return;
	}

	public sendEvent(category: string, action: string, label?: string, val?: number, extra?: any): void {
		return;
	}

	public sendPageView(pathname: string): void {
		return;
	}

}
