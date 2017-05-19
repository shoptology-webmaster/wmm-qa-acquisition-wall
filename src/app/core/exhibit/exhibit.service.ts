import { ExhibitState, ExhibitsMock, Exhibit } from './exhibit.model';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from "rxjs/Rx";


@Injectable()
export class ExhibitService {

    private subject: BehaviorSubject<ExhibitState>;
    public store: Observable<ExhibitState>;

    constructor() {
        this.subject = new BehaviorSubject<ExhibitState>({
			exhibits: ExhibitsMock
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


	public getExhibit(name: string): Observable<Exhibit> | Observable<void> {
		return this.store.map((store) => {
			store.exhibits.forEach((exhibit) => {
				if (exhibit.name === name) {
					return exhibit;
				}
			});

			return;
		});
	}

}
