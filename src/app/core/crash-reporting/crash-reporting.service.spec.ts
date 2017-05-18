import { async, getTestBed, TestBed } from '@angular/core/testing';
import { TestUtils } from '../../test';

import { CrashReportingService } from './crash-reporting.service';

describe('Service: CrashReportingService', () => {
	let service: CrashReportingService;

	beforeEach(async(() => {
		const testbed = getTestBed();
		TestUtils.configureIonicTestingModule([], []);
		service = testbed.get(CrashReportingService);
	}));

	it('initialises', () => {
		expect(service).not.toBeNull();
	});

});
