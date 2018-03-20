import { ExhibitState, KioskData, ExhibitsMock, Company, Slide } from './exhibit.model';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from "rxjs/Rx";

import { APIService } from '../api/api.service';
import { CacheService } from '../cache/cache.service';
import { Asset } from '../cache/cache.model';


@Injectable()
export class ExhibitService {

	private subject: BehaviorSubject<ExhibitState>;
	public store: Observable<ExhibitState>;

	constructor(
		private apiService: APIService,
		private cacheService: CacheService
	) {
		this.subject = new BehaviorSubject<ExhibitState>({
			KioskData: ExhibitsMock
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
	 * @memberof ExhibitService
	 */
	public select<T>(name: string): Observable<T> {
		return this.store.pluck(name);
	}

	public getExhibits(kioskNumber?: number): Promise<any> {
		return new Promise((resolve, reject) => {
			if(typeof kioskNumber === 'undefined') {
				kioskNumber = 0;
			}

			this.apiService.getExhibitData()
				.subscribe((data) => {
					console.log(data);
					if(data.kiosks && data.kiosks.length) {
						let kioskData;
						data.kiosks.forEach((k, idx) => {
							if(k.ScreenNumber === kioskNumber) {
								kioskData = data.kiosks[idx];
							}
						});

						if(typeof data.kiosks[kioskNumber] === 'undefined' || !kioskData) {
							kioskNumber = data.kiosks.length - 1;
							kioskData = data.kiosks[kioskNumber];
						}

						this.subject.next({ KioskData: kioskData });

						resolve(this.subject.value);
					} else {
						reject('server_error');
					}
				}, (err) => {
					// If we get an error, return the mock data.
					console.log(err);
					resolve(this.subject.value);
					//resolve(this.subject.value.exhibits);
					//reject('server_error');
				});
		});
	}

	public getCompany(name: string): Observable<Company> | Observable<void> {
		return this.store.map((store) => {
			store.KioskData.Companies.forEach((company) => {
				if (company.CompanyName === name) {
					return company;
				}
			});

			return;
		});
	}

	public getExhibitAssetList(): Promise<Asset[]> {
		return new Promise((resolve, reject) => {
			let data = this.subject.value;
			let assetList: Asset[] = [];

			data.KioskData.Companies.forEach((c) => {
				if(c.TileLogo) {
					assetList.push(this.cacheService.stringToAsset(c.TileLogo));
				}

				if(c.Slides) {
					c.Slides.forEach((s) => {
						if(s.Logo) {
							assetList.push(this.cacheService.stringToAsset(s.Logo));
						}
						if(s.Image) {
							assetList.push(this.cacheService.stringToAsset(s.Image));
						}
					});
				}
			});

			resolve(assetList);
		});
	}
}
