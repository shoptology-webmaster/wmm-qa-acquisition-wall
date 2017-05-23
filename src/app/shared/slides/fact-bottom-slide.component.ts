import { Animations } from './../../core/animations/animations.model';
import { Observable } from 'rxjs/Rx';
import { SlidesService } from './../slides.service';
import { Slide } from './../../core/exhibit/exhibit.model';
import { Component } from '@angular/core';

let animations = new Animations();

@Component({
	selector: 'fact-bottom-slide',
	template: `
		<div *ngIf="isActive | async" class="container">
			<img @top class="img" [src]="data.img">
			<div @bottom  class="fact" [innerHTML]="data.fact"></div>
		</div>
	`,
	animations: [
		animations.slideTopFade('top', '800ms cubic-bezier(0.19, 1, 0.22, 1)'),
		animations.slideBottomFade('bottom', '800ms cubic-bezier(0.19, 1, 0.22, 1)')
	]
})
export class FactBottomSlideComponent {
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
