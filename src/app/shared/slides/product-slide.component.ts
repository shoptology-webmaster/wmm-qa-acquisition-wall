import { Slide } from './../../core/exhibit/exhibit.model';
import { Component } from '@angular/core';
import { Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'product-slide',
	template: `
		<img class="logo" [src]="data.logo">
		<div class="title" [style.color]="data.accent">{{ data.title }}</div>
		<div class="desc">{{ data.desc }}</div>
		<img class="product" [src]="data.product">
	`
})
export class ProductSlideComponent {
	public data: Slide;

	init(data:any) {
		this.data = data;
	}
}
