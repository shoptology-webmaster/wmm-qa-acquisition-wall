import { slideTopFade, slideBottomFade } from './../../core/animations/animations.model';
import { Observable } from 'rxjs/Rx';
import { SlidesService } from './../slides.service';
import { Slide } from './../../core/exhibit/exhibit.model';
import { Component } from '@angular/core';

@Component({
	selector: 'product-slide',
	template: `
		<div *ngIf="isActive | async" class="container">
			<img @top class="logo" [src]="data.Logo | getCacheUrl | async">
			<div @top class="title" [style.color]="">{{ data.TitleText }}</div>
			<div @top class="desc" [innerHTML]="data.BodyText"></div>
			<img @bottom class="product" [src]="data.Image | getCacheUrl | async">
		</div>
	`,
	animations: [
		slideTopFade('top', '800ms cubic-bezier(0.19, 1, 0.22, 1)'),
		slideBottomFade('bottom', '800ms cubic-bezier(0.19, 1, 0.22, 1)')
	]
})
export class ProductSlideComponent {
	public data: Slide;
	public idx: number;
	public isActive: Observable<boolean>;

	constructor(
		private slidesService: SlidesService
	) {
		this.isActive = this.slidesService.select('currentSlide')
			.map((currentSlide) => {
				return currentSlide === this.idx;
			});
	}

	init(data:any, idx: number) {
		this.data = data;
		this.idx = idx;
	}
}
