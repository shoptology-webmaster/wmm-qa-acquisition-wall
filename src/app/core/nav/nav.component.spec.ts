import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../../test';
import { NavComponent }          from './nav.component';

let fixture: ComponentFixture<NavComponent> = undefined;
let instance: any = undefined;

describe('Components: Nav', () => {

	beforeEach(async(() => TestUtils.beforeEachCompiler([NavComponent]).then(compiled => {
		fixture = compiled.fixture;
		instance = compiled.instance;
	})));

	it('should create the path for nav', async(() => {
		expect(instance).toBeTruthy();
	}));
});
