import { ApplicationRef, NgZone, Component, Input,
	ViewContainerRef, ComponentRef, ComponentFactory,
	ComponentFactoryResolver, ViewChild, Type } from '@angular/core';

import { ProductSlideComponent } from './slides/product-slide.component';
import { FactBottomSlideComponent } from './slides/fact-bottom-slide.component';
import { FactTopSlideComponent } from './slides/fact-top-slide.component';
import { TextSlideComponent } from './slides/text-slide.component';

@Component({
	selector: 'slide-container',
	template: `
		<template #slideContainer></template>
	`
})
export class SlideContainerComponent {
	@Input() slide: any;
	@Input() idx: any;
	@Input() accentColor: any;
	@Input() companyName: any;
	@Input() textNumber: any;
	@ViewChild('slideContainer', {read: ViewContainerRef}) slideContainer: ViewContainerRef;

	public componentRef: ComponentRef<any>;

	constructor(
		public viewContainerRef: ViewContainerRef,
		private _componentFactoryResolver: ComponentFactoryResolver,
		private _vcr: ViewContainerRef,
	) {}

	ngOnInit() {
		this.loadComponent();
	}

	ngOnDestroy() {
		this.componentRef.destroy();
	}

	loadComponent() {
		let componentFactory: ComponentFactory<any>;
		let componentType: any;

		switch(this.slide.SlideTemplate) {
			case 'slide-title':
				componentType = ProductSlideComponent;
				break;
			case 'slide-image-top':
				componentType = FactBottomSlideComponent;
				break;
			case 'slide-image-bottom':
				componentType = FactTopSlideComponent;
				break;
			case 'slide-end':
				componentType = TextSlideComponent;
				break;
			default:
				return;
		}

		componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);
		this.componentRef = this.slideContainer.createComponent(componentFactory);
		this.componentRef.instance.init(this.slide, this.idx, this.accentColor, this.companyName, this.textNumber);
	}

}
