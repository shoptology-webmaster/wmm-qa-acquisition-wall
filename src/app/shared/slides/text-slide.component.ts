import { slideTopFade, slideBottomFade } from './../../core/animations/animations.model';
import { Observable } from 'rxjs/Rx';
import { SlidesService } from './../slides.service';
import { Slide } from './../../core/exhibit/exhibit.model';
import { Component } from '@angular/core';

@Component({
	selector: 'text-slide',
	template: `
		<div *ngIf="isActive | async" class="container">
			<img @top class="logo" [src]="data.Logo | getCacheUrl | async">
			<div @top class="desc">
				<p>Want to learn more about {{ companyName }}?</p>
				<p>Text <span class="bold">WALMART {{ data.TextKeyword }}</span> to <span class="bold">{{textNumber}}</span></p>
				<p class="legal">(Message and data rates may apply. Text STOP to unsubscribe.)</p>
			</div>
			<img @bottom class="product" [src]="data.Image | getCacheUrl | async">
		</div>
	`,
	animations: [
		slideTopFade('top', '800ms cubic-bezier(0.19, 1, 0.22, 1)'),
		slideBottomFade('bottom', '800ms cubic-bezier(0.19, 1, 0.22, 1)')
	]
})
export class TextSlideComponent {
	public data: Slide;
	public idx: number;
	public companyName: string;
	public textNumber: string | number;
	public isActive: Observable<boolean>;

	constructor(
		private slidesService: SlidesService
	) {
		this.isActive = this.slidesService.select('currentSlide')
			.map((currentSlide) => {
				return currentSlide >= this.idx;
			});
	}

	init(data:any, idx: number, accentColor: any, companyName: string, textNumber: string | number) {
		this.data = data;
		this.idx = idx;
		this.companyName = companyName;
		this.textNumber = textNumber;
	}
}
