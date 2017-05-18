import { ComponentFixture, async, TestBed } from '@angular/core/testing';

import { TestUtils }               from '../../../test';
import { TimeoutComponent }          from './timeout.component';

let fixture: ComponentFixture<TimeoutComponent> = undefined;
let instance: any = undefined;

describe('Components: Timeout', () => {
	let testDelay: number = 100;
	let testCountdown: number = 1000;

	beforeEach(async(() => TestUtils.beforeEachCompiler([TimeoutComponent]).then(compiled => {
		fixture = compiled.fixture;
		instance = compiled.instance;

		instance.delay = testDelay;
		instance.countdownDelay = testCountdown;

		spyOn(instance, 'goToPassive').and.returnValue(true);
		spyOn(instance, 'hideAlert').and.returnValue(true);
		spyOn(instance, 'shouldShowAlert').and.returnValue(true);
		spyOn(instance, 'showAlert');
	})));

	it('should create the path for timeout', async(() => {
		expect(instance).toBeTruthy();
	}));

	it('should load countdown modal after the delay', () => {
		jasmine.clock().uninstall();
		jasmine.clock().install();

		instance.startTimer();
		jasmine.clock().tick(101);

		expect(instance.showAlert).toHaveBeenCalled();
		instance.stopTimer();
	});

	it('should not load countdown modal if stopped', () => {
		jasmine.clock().uninstall();
		jasmine.clock().install();

		instance.startTimer();
		jasmine.clock().tick(50);
		instance.resetTimer();
		jasmine.clock().tick(60);

		expect(instance.showAlert).not.toHaveBeenCalled();
		instance.stopTimer();
	});

	it('should go to PassiveComponent after countdown modal', () => {
		jasmine.clock().uninstall();
		jasmine.clock().install();

		instance.startCountdown();
		jasmine.clock().tick(1001);
		expect(instance.goToPassive).toHaveBeenCalled();
		instance.stopCountdown();
	});

	it('should not go to PassiveComponent if we stop countdown', () => {
		jasmine.clock().uninstall();
		jasmine.clock().install();

		instance.startCountdown();
		jasmine.clock().tick(500);
		instance.stopCountdown();
		expect(instance.goToPassive).not.toHaveBeenCalled();
	});

	afterEach(() => {
		jasmine.clock().uninstall();
	});

});
