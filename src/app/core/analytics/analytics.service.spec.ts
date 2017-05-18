import { async, getTestBed, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { AnalyticsService } from './analytics.service';
import { APIService } from '../api';

describe('Service: AnalyticsService', () => {
	let service: AnalyticsService;
	let category: string = 'testing';
	let action: string = 'click';
	let label: string = 'Test Button';
	let val: number = 1;

	beforeEach(async(() => {
		const testbed = getTestBed();
		TestUtils.configureIonicTestingModule([], []);
		service = testbed.get(AnalyticsService);
	}));

	it('initialises', () => {
		expect(service).not.toBeNull();
	});

	it('sets a session id when you send an event for the first time', () => {
		expect(service.sessionId).toBeUndefined();
		service.sendEvent(category, action, label, val);
		expect(service.sessionId).not.toBeUndefined();
	});

	it('removes a session id', () => {
		expect(service.sessionId).toBeUndefined();
		service.sendEvent(category, action, label, val);
		expect(service.sessionId).not.toBeUndefined();
		service.stopSession();
		expect(service.sessionId).toBeUndefined();
	});

});
