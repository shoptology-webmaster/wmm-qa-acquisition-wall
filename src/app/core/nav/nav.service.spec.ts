import { async, getTestBed, TestBed } from '@angular/core/testing';
import { TestUtils } from '../../../test';

import { NavService } from './nav.service';

describe('Service: NavService', () => {
	let service: NavService;

	beforeEach(async(() => {
		const testbed = getTestBed();
		TestUtils.configureIonicTestingModule([], []);
		service = testbed.get(NavService);
	}));

	it('initialises', () => {
		expect(service).not.toBeNull();
	});

});
