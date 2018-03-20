import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { environment } from '../../../environment/environment';
import { CrashReportingService } from '../../core/crash-reporting/crash-reporting.service';
import { Asset } from './cache.model';
import { CacheObject } from './cache-object';

declare var FileTransfer: any;
declare var cordova: any;
declare var device: any;
declare var LocalFileSystem: any;

@Injectable()
export class CacheService {
	public queue: Observable<CacheObject[]>;
	public completed: Observable<CacheObject[]>;
	public queueCompleted: Observable<boolean>;

	private cacheMode: string = 'parallel';

	private _queue: BehaviorSubject<CacheObject[]> = new BehaviorSubject<CacheObject[]>([]);
	private _completed: BehaviorSubject<CacheObject[]> = new BehaviorSubject<CacheObject[]>([]);
	private _queueCompleted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	private _assetList: string[] = [];
	private cacheServiceAvailable: boolean = false;

	constructor(
		private crashReportingService: CrashReportingService
	) {
		this.queue = this._queue.asObservable();
		this.completed = this._completed.asObservable();
		this.queueCompleted = this._queueCompleted.asObservable();

		if (environment.cacheAssets &&
			typeof device !== 'undefined' &&
			device.platform === 'Android') {
			this.cacheServiceAvailable = true;
		}

		if (environment.cacheMode) {
			this.cacheMode = environment.cacheMode;
		}

		// Restore our asset list if we have one. This will
		// let a fresh kiosk know that it really needs to perform
		// the cache process, even outside of the update window.
		let assetList = localStorage.getItem('assetList');
		if (assetList !== null) {
			this._assetList = assetList.split(',');
		}
	}

	/**
	 * Explicitly add item(s) to the cache.
	 * Generally used by the getCacheURL pipe to force the download of missing assets.
	 *
	 * @param {(string | string[])} toCache
	 * @returns {Promise<any>}
	 * @memberof CacheService
	 */
	public add(toCache: string | string[]): Promise<any> {
		return new Promise((resolve, reject) => {
			if (!this.cacheServiceAvailable) {
				// Maybe just resolve?
				resolve();
				// reject('Cache service unavailable.');
				return;
			}

			if (!toCache.length) {
				reject('Bad param');
				return;
			}

			let queue = [];

			if (typeof toCache === 'object') {
				toCache.forEach((file) => {
					let f = {
						fileName: this.getFileName(file),
						filePath: file
					};
					queue.push(this.assetToCacheObject(f));
				});
			} else {
				let f = {
					fileName: this.getFileName(toCache),
					filePath: toCache
				};
				queue.push(this.assetToCacheObject(f));
			}

			this.cache(queue);
		});
	}

	/**
	 * Update the current cache
	 *
	 * @param {Asset[]} assetList
	 * @param {boolean} [forceUpdate]
	 * @returns {void}
	 * @memberof CacheService
	 */
	public update(assetList: Asset[], forceUpdate?: boolean): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (!this.cacheServiceAvailable) {
				resolve(false);
				return;
			}

			if (!forceUpdate) {
				assetList = this.getNewAssets(assetList);

				if (assetList.length) {
					this.cache(this.assetsToCacheObjects(assetList));
				}
				resolve(true);
			} else {
				this.clear()
					.then(() => {
						this.cache(this.assetsToCacheObjects(assetList));
						resolve(true);
					})
					.catch((err) => {
						console.log(err);
						reject(err);
					});
			}
		});
	}

	public clear() {
		return new Promise((resolve, reject) => {
			if (!this.cacheServiceAvailable) {
				// Maybe do something?
				resolve();
				return;
			}

			this._assetList = [];
			this._completed.next([]);
			this._queue.next([]);

			// If something happens and we restart, the app should know it needs a cache set.
			localStorage.removeItem('assetList');

			window['resolveLocalFileSystemURL'](cordova.file.externalRootDirectory + environment.appShortName + '/',
				(dir) => {
					dir.removeRecursively(() => {
						resolve();
					}, (err) => {
						if (environment.debugAvailable) {
							console.log('CacheService:: Error cleaning folder.', err);
						}
						resolve();
					});
				}, (err) => {
					if (err.code === 1) {
						resolve();
					} else {
						// Maybe do something?
						resolve();
					}
				});
		});
	}

	public makeCacheDir() {
		return new Promise((resolve, reject) => {
			if (!this.cacheServiceAvailable) {
				// Maybe do something?
				resolve();
				return;
			}
			window['resolveLocalFileSystemURL'](cordova.file.externalRootDirectory,
				(dir) => {
					dir.getDirectory(environment.appShortName,
						{
							create: true,
							exclusive: false
						},
						(dirEntry) => {
							if (environment.debugAvailable) {
								console.log('CacheService:: Created directory.', dirEntry);
							}
							resolve();
						},
						(err) => {
							reject(err);
						});
				},
				(err) => {
					reject(err);
				});
		});
	}

	public isCacheEmpty() {
		if (!this._assetList || this._assetList.length === 0) {
			return true;
		} else {
			return false;
		}
	}

	public stringToAsset(p): Asset {
		return {
			fileName: p.match(/[^/]+$/)[0],
			filePath: p
		}
	}

	private assetsToCacheObjects(assets: Asset[]) {
		let cacheObjs: CacheObject[] = assets.map((asset) => {
			return this.assetToCacheObject(asset);
		});

		return cacheObjs;
	}

	private assetToCacheObject(asset: Asset) {
		return new CacheObject(asset, cordova.file.externalRootDirectory + environment.appShortName + '/');
	}

	/**
	 * Determines which assets from a list are already supposed to be cached
	 * and returns a list of uncached assets
	 *
	 * @private
	 * @param {Asset[]} newAssetList
	 * @returns {Asset[]}
	 * @memberof CacheService
	 */
	private getNewAssets(newAssetList: Asset[]): Asset[] {
		let newAssets: Asset[] = [];

		// If nothing has been cached, cache everything
		if (!this._assetList.length) {
			return newAssets;
		}

		newAssetList.forEach((asset) => {
			if (this._assetList.indexOf(asset.filePath) === -1) {
				newAssets.push(asset);
			}
		});

		return newAssets;
	}

	private cache(cacheList: CacheObject[]): void {
		this._queueCompleted.next(false);

		let queue = this._queue.value;

		cacheList.forEach((cacheObj) => {
			queue.push(cacheObj);
		});

		if (this.cacheMode === 'parallel') {
			queue.forEach((cacheObj) => {
				cacheObj.cache();

				// Check for leak
				cacheObj.status.subscribe(this.handleStatusEvent.bind(this));
			});
		} else {
			this.cacheOne();
		}

		this._queue.next(queue);
	}

	private cacheOne() {
		let queue = this._queue.value;
		if (queue.length) {
			queue[0].cache();
			queue[0].status.subscribe((statusEvent) => {
				this.handleStatusEvent(statusEvent, true);
			});
		}
	}

	private handleStatusEvent(statusEvent, next?: boolean) {
		if (statusEvent.completed) {
			this.removeFromQueue(statusEvent.asset);
		}
		if (statusEvent.aborted) {
			this.crashReportingService.captureMessage('Caching failed for: ' + statusEvent.asset, { extra: statusEvent });

			this.removeFromQueue(statusEvent.asset, true);
		}
		if (next) {
			this.cacheOne();
		}
	}

	/**
	 * Moves a CacheObject object from queue -> completed (if it's in the queue)
	 *
	 * @private
	 * @param {CacheObject} cacheObj
	 * @memberof CacheService
	 */
	private removeFromQueue(asset: Asset, failed?: boolean): void {
		let queue = this._queue.value;
		let completed = this._completed.value;

		for (let i = 0; i < queue.length; i++) {
			let o = queue[i];

			if (o.asset.filePath === asset.filePath) {
				if (environment.debugAvailable) {
					console.log('CacheService:: Caching complete for: ' + o.asset.fileName);
				}

				if (!failed) {
					completed.push(o);
					this._completed.next(completed);
					this._assetList.push(o.asset.filePath);
				}

				queue.splice(i, 1);
				this._queue.next(queue);

				if (queue.length === 0) {
					localStorage.setItem('assetList', this._assetList.join(','));
					this._queueCompleted.next(true);
				}
				break;
			}
		}
	}

	private addFile(file) {
		return new Promise((resolve, reject) => {
			let ft = new FileTransfer();

			ft.download(
				encodeURI(file.path),
				cordova.file.externalRootDirectory + environment.appShortName + '/' + file.name,
				(entry) => {
					resolve(entry);
				},
				(err) => {
					reject(err);
				}
			);
		});
	}

	private getFileName(filePath) {
		return filePath.match(/[^/]+$/)[0];
	}
}
