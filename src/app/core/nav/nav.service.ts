import { Injectable } from '@angular/core';
import { NavOptions } from './nav.model';

import { Subject, Observable } from 'rxjs/Rx';

/**
 * Keeps the nav state.
 *
 * @export
 * @class NavService
 */
@Injectable()
export class NavService {
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

	public accessibilityMode: boolean = false;
	public isSearchModalOpen: boolean = false;
	public isSearchFilterable: boolean = false;
	public passiveRootConfigured: boolean = false;
	public onGoHome: Observable<boolean>;
	public onGoBack: Observable<boolean>;
	public onTappedBack: Observable<boolean>;
	public onTappedHome: Observable<boolean>;
	public onSetAccessibilityMode: Observable<boolean>;

	private _onGoHome: Subject<boolean>;
	private _onGoBack: Subject<boolean>;
	private _onTappedBack: Subject<boolean>;
	private _onSetAccessibilityMode: Subject<boolean>;
	private _onTappedHome: Subject<boolean>;

	constructor() {
		this._onGoHome = <Subject<boolean>> new Subject();
		this.onGoHome = this._onGoHome.asObservable();

		this._onGoBack = <Subject<boolean>> new Subject();
		this.onGoBack = this._onGoBack.asObservable();

		this._onTappedBack = <Subject<boolean>> new Subject();
		this.onTappedBack = this._onTappedBack.asObservable();

		this._onTappedHome = <Subject<boolean>> new Subject();
		this.onTappedHome = this._onTappedHome.asObservable();

		this._onSetAccessibilityMode = <Subject<boolean>> new Subject();
		this.onSetAccessibilityMode = this._onSetAccessibilityMode.asObservable();
	}

	/**
	 * Shows the search modal.
	 *
	 * @returns {void}
	 *
	 * @memberOf NavService
	 */
	public showSearchModal(): void {
		this.isSearchModalOpen = true;
	}

	/**
	 * Hides the search modal.
	 *
	 * @returns {void}
	 *
	 * @memberOf NavService
	 */
	public hideSearchModal(): void {
		this.isSearchModalOpen = false;
	}

	/**
	 * Shows the main logo.
	 *
	 * @returns {void}
	 *
	 * @memberOf NavService
	 */
	public showLogo(): void {
		this.options.showLogo = true;
	}

	/**
	 * Hides the main logo.
	 *
	 * @returns {void}
	 *
	 * @memberOf NavService
	 */
	public hideLogo(): void {
		this.options.showLogo = false;
	}

	/**
	 * Allows components to send the user home.
	 *
	 * @returns {void}
	 *
	 * @memberOf NavService
	 */
	public goHome(): void {
		this._onGoHome.next(true);
	}

	/**
	 * Allows components to send the user back.
	 *
	 * @returns {void}
	 *
	 * @memberOf NavService
	 */
	public goBack(): void {
		this._onGoBack.next(true);
	}

	/**
	 * Triggers when the back button is tapped
	 * to allow custom back button overrides.
	 *
	 * @returns {void}
	 *
	 * @memberOf NavService
	 */
	public tappedBack(): void {
		this._onTappedBack.next(true);
	}

	/**
	 * Triggers when the home button is tapped
	 * to allow custom home button overrides.
	 *
	 * @returns {void}
	 *
	 * @memberOf NavService
	 */
	public tappedHome(): void {
		this._onTappedHome.next(true);
	}

	/**
	 * Allows components to trigger accessibility mode.
	 *
	 * @param {boolean} state
	 *
	 * @returns {void}
	 *
	 * @memberOf NavService
	 */
	public setAccessibilityMode(state: boolean): void {
		this.accessibilityMode = state;
		this._onSetAccessibilityMode.next(state);
	}
}
