import { async, getTestBed, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { TestUtils } from '../../../test';

import { AnalyticsTimerService } from './analytics-timer.service';
import { APIService } from '../api';

describe('Service: AnalyticsTimerService', () => {
	let service: AnalyticsTimerService;
	let timerName: string;
	let category: string = 'testCat';
	let variable: string = 'testVar';
	let label: string = 'testLabel';

	beforeEach(async(() => {
		const testbed = getTestBed();
		TestUtils.configureIonicTestingModule([], []);
		service = testbed.get(AnalyticsTimerService);
	}));

	it('initialises', () => {
		expect(service).not.toBeNull();
	});

	it('starts an analytics timer and returns the reference', () => {
		timerName = service['start'](category, variable, label);
		expect(timerName).toEqual(category + variable);
		expect(service.timers[category + variable]).toBeDefined();
	});

	it('stops an analytics timer and removes the reference', () => {
		timerName = service['start'](category, variable, label);
		let timer = service['stop'](timerName);
		expect(timer).not.toBeUndefined();
	});

	it('cant stop a timer that doesnt exist', () => {
		let timer = service['stop']('myTestTimer');
		expect(timer).toBeFalsy();
	});

});
