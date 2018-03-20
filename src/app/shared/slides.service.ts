import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from "rxjs/Rx";

export interface SlidesState {
	currentSlide: number;
}

@Injectable()
export class SlidesService {
	private subject: BehaviorSubject<SlidesState>;
	public store: Observable<SlidesState>;

		constructor() {
		this.subject = new BehaviorSubject<SlidesState>({
			currentSlide: 0
		});
		this.store = this.subject.asObservable();
	}

	/**
	 * Pluck something out of the store
	 *
	 * @template T
	 * @param {string} name
	 * @returns {Observable<T>}
	 *
	 * @memberof QuizService
	 */
	public select<T>(name: string): Observable<T> {
		return this.store.pluck(name);
	}

	public setCurrentSlide(num: number) {
		let value = this.subject.value;
		this.subject.next({...value, currentSlide: num});
	}

}
