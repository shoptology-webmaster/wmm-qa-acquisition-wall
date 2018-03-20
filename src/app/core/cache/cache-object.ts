import { NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../../environment/environment';
import { Asset } from './cache.model';

declare var cordova;
declare var FileTransfer;

interface StatusEvent {
	completed: boolean;
	progress: number;
	asset: Asset;
	aborted: boolean;
}

export class CacheObject {
	public status: BehaviorSubject<StatusEvent> = new BehaviorSubject(
		{
			completed: false,
			progress: 0,
			asset: null,
			aborted: false
		}
	);
	public completed: boolean = false;
	public transferring: boolean = false;
	public asset: Asset;

	private path = cordova.file.externalRootDirectory;
	private retriesLeft: number = 3;
	private zone: NgZone = new NgZone({});

	private ft;

	private downloadTimeout;

	constructor(_asset, _path?: string) {
		this.asset = _asset;
		if(_path) {
			this.path = _path;
		}
	}

	public cache(): void {
		if(!this.retriesLeft) {
			if(environment.debugAvailable) {
				console.log('CacheObject:: Caching failed for: ' + this.asset.fileName + ' out of retries.');
			}
			this.abort();
			return;
		} else if(environment.debugAvailable) {
			console.log('CacheObject:: Caching started for: ' + this.asset.fileName);
		}

		this.retriesLeft--;

		this.ft = new FileTransfer();

		this.transferring = true;

		this.ft.onprogress = (ev) => {
			if(this.downloadTimeout) {
				clearTimeout(this.downloadTimeout);
			}

			let percent = (ev.loaded / ev.total) * 100;
			let complete = (percent === 100) ? true : false;

			this.status.next({
				completed: complete,
				progress: percent,
				asset: this.asset,
				aborted: false
			});

			if (!complete) {
				this.downloadTimeout = setTimeout(this.cache.bind(this), 10000);
			}
		};

		this.ft.download(
			encodeURI(this.asset.filePath),
			this.path + '/' + this.asset.fileName,
			(entry) => {
				this.zone.run(() => {
					if (this.downloadTimeout) {
						clearTimeout(this.downloadTimeout);
					}
					this.completed = true;
					this.transferring = false;
					this.status.next(
						{
							completed: true,
							progress: 100,
							asset: this.asset,
							aborted: false
						}
					);
				});
			},
			(err) => {
				if(environment.debugAvailable) {
					console.log('CacheObject:: ', err);
					console.log('CacheObject:: Trying again...');
				}
				this.cache();
			}
		);
	}

	private abort() {
		this.transferring = false;
		if(this.downloadTimeout) {
			clearTimeout(this.downloadTimeout);
		}
		if(this.ft) {
			this.ft.abort();
		}
		this.status.next({
			completed: false,
			progress: 0,
			asset: this.asset,
			aborted: true
		});
	}
}
