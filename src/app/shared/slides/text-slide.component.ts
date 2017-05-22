import { Slide } from './../../core/exhibit/exhibit.model';
import { Component } from '@angular/core';

@Component({
	selector: 'text-slide',
	template: `
		<img class="logo" [src]="data.logo">
		<div class="desc">
			<p>Explore some of our newest family members by texting <span class="bold">BRANDS</span> to <span class="bold">12343</span></p>
		</div>
		<img class="product" [src]="data.product">
	`
})
export class TextSlideComponent {
	public data: Slide;

	init(data:any) {
		this.data = data;
	}
}
