import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';

@Injectable()
export class HeartbeatService {
	private heartbeatInterval;
	private heartbeatId;

	private isReboot: boolean = true;
	private heartbeatCount: number = 0;

	constructor(
		private http: Http
	) {}

	public start(projectName, id) {
		this.heartbeatId = projectName + ':' + id;

		if (this.heartbeatInterval) {
			clearInterval(this.heartbeatInterval);
		}

		this.heartbeatInterval = setInterval(() => {
			this.sendHeartbeat();
		}, 60000);
	}

	private sendHeartbeat() {
		this.http.get(environment.heartbeatHost + '/heartbeat?deviceId=' + this.heartbeatId + '&restarted=' + this.isReboot + '&count=' + this.heartbeatCount)
			.take(1)
			.subscribe((result) => {
				let body = result.json();
				this.isReboot = false;
				this.heartbeatCount++;
				switch (body.status) {
					case 'restart':
						window.location.reload();
						break;
					case 'upgrade':
						localStorage.setItem('upgrade', 'yes');
						window.location.reload();
						break;
					case 'ok':
					default:
						console.log(body);
						break;
				}

			}, (err: any) => {
				console.log('Unknown error sending heartbeat');
			});
	}
}
