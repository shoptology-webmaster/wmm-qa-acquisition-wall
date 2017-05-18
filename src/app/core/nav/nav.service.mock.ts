import { NavOptions } from './nav.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavServiceMock {
	public options: NavOptions = {
		visible: true,
		showBack: true,
		showHome: true,
		showSearch: true,
		showLogo: true,
		showAccessibilityMode: true,
		disableBack: false,
		disableHome: false
	};

	public showSearchModal(): void {
		return;
	}

	public hideSearchModal(): void {
		return;
	}

	public showLogo(): void {
		return;
	}

	public hideLogo(): void {
		return;
	}

	public goHome(): void {
		return;
	}

	public goBack(): void {
		return;
	}

	public tappedBack(): void {
		return;
	}

	public setAccessibilityMode(state: boolean): void {
		return;
	}
}
