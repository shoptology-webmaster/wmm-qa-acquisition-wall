import { Slide } from './../../core/exhibit/exhibit.model';
import { Component } from '@angular/core';

@Component({
	selector: 'fact-top-slide',
	template: `
		<div class="fact" [innerHTML]="data.fact"></div>
		<img class="img" [src]="data.img">
	`
})
export class FactTopSlideComponent {
	public data: Slide;

	init(data:any) {
		this.data = data;
	}
}
