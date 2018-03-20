/*
 * Converts a url to a local path, if caching is enabled.
 * Assumes assets have been cached already.
 *
 * Usage:
 * 	value | getCacheUrl
 * Example:
 * 	{{ http://some.url/asset.mp4 |  getCacheUrl }}
 * 	formats to:
 * 	</storage/sdcard/><appShortName>/asset.mp4
 */

import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../environment/environment';
import { CacheService } from '../../core/cache/cache.service';

declare var device: any;
declare var cordova: any;

@Pipe({
	name: 'getCacheUrl'
})
export class GetCacheUrlPipe implements PipeTransform {

	constructor(private cacheService: CacheService) {}

	transform(value: string, args: string[]): any {
		if (!value ||
			!(environment.cacheAssets &&
				typeof device !== 'undefined' &&
				device.platform === 'Android')
		) {
			return new Promise((resolve, reject) => {
				resolve(value);
			});
		} else {
			let path = cordova.file.externalRootDirectory + environment.appShortName + '/' + value.match(/[^/]+$/)[0];

			return new Promise((resolve, reject) => {
				window['resolveLocalFileSystemURL'](path,
					() => {
						console.log('fileExists', path);
						resolve(path);
					},
					(err) => {
						console.log('file doesn\'t exists', value);
						resolve(value);
						this.cacheService.add(value);
					}
				);
			});
		}
	}
}
