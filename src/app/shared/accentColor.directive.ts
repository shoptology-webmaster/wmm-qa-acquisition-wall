import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[accentColorStyle]'
})
export class AccentColorDirective {
	@Input() accentColor: string;

	constructor(private el: ElementRef) {}

	ngAfterViewInit() {
		this.el.nativeElement.innerHTML = `
		<style>
			.accent {
				color: ${this.accentColor}!important;
			}
		</style>
		`;
	}
}
