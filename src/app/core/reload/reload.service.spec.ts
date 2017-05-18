import { async, getTestBed, TestBed } from '@angular/core/testing';
import { TestUtils } from '../../../test';

import { ReloadService } from './reload.service';

describe('Service: ReloadService', () => {
	let service: ReloadService;
	let timerCallback;

	beforeEach(async(() => {
		const testbed = getTestBed();
		TestUtils.configureIonicTestingModule([], []);
		service = testbed.get(ReloadService);
	}));

	beforeEach(() => {
		spyOn(service, 'reloadApp');
		jasmine.clock().uninstall();
		jasmine.clock().install();
		service.delay = 100;
	});

	it('initialises', () => {
		expect(service).not.toBeNull();
	});

	it('starts a reload timer', () => {
		service.startTimer();
		jasmine.clock().tick(101);

		expect(service.reloadApp).toHaveBeenCalled();
	});

	it('stops a reload timer', () => {
		service.startTimer();
		jasmine.clock().tick(50);
		service.stopTimer();
		jasmine.clock().tick(60);

		expect(service.reloadApp).not.toHaveBeenCalled();
	});

	it('resets a reload timer', () => {
		service.startTimer();
		jasmine.clock().tick(50);
		service.resetTimer();
		jasmine.clock().tick(101);

		expect(service.reloadApp).toHaveBeenCalled();
	});

	afterEach(() => {
		jasmine.clock().uninstall();
	});

});
