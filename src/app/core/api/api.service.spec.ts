import { async, getTestBed, TestBed } from '@angular/core/testing';
import { TestUtils } from '../../../test';

import { APIService } from './api.service';

describe('Service: APIService', () => {
	let service: APIService;

	beforeEach(async(() => {
		const testbed = getTestBed();
		TestUtils.configureIonicTestingModule([], []);
		service = testbed.get(APIService);
	}));

	it('initialises', () => {
		expect(service).not.toBeNull();
	});

});
