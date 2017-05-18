import { async, getTestBed, TestBed } from '@angular/core/testing';
import { TestUtils } from '../../test';

import { DeviceService } from './device.service';
import { environment } from '../../environments/environment';

describe('Service: DeviceService', () => {
	let service: DeviceService;

	beforeEach(async(() => {
		const testbed = getTestBed();
		TestUtils.configureIonicTestingModule([], []);
		service = testbed.get(DeviceService);
	}));

	it('initialises', () => {
		expect(service).not.toBeNull();
	});

	describe('getStoreNumber', () => {
		it('should return 0 if we dont have a store number set in localstorage', () => {
			localStorage.removeItem('storeNumber');
			expect(service.getStoreNumber()).toBe(0);
		});

		it('should return the store number if its set in localstorage', () => {
			localStorage.setItem('storeNumber', '100');
			expect(service.getStoreNumber()).toBe(100);
		});
	});

	describe('getImageWithProxy', () => {
		it('should return the same url back if not in production mode', () => {
			expect(service.getImageWithProxy('myurl')).toBe('myurl');
		});

		it('should return the proxy url with the url param if in production', () => {
			environment.useProxy = true;
			expect(service.getImageWithProxy('myurl')).toBe(environment.apiUrl + '/proxy?url=myurl');
			environment.useProxy = false;
		});
	});

});
