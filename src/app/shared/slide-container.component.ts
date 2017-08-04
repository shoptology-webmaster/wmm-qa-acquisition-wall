import { ApplicationRef, NgZone, Component, Input, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver, ViewChild, Type } from '@angular/core';


@Component({
	selector: 'slide-container',
	template: `
		<template #slideContainer></template>
	`
})
export class SlideContainerComponent {
	@Input() slide: any;
	@Input() idx: any;
	@ViewChild('slideContainer', {read: ViewContainerRef}) slideContainer: ViewContainerRef;

	public componentRef: ComponentRef<any>;

	constructor(
		public viewContainerRef: ViewContainerRef,
		private _componentFactoryResolver: ComponentFactoryResolver,
		private _vcr: ViewContainerRef,
	) {

	}

	ngOnInit() {
	    this.loadComponent();
	}

	ngOnDestroy() {
		this.componentRef.destroy();
	}

	loadComponent() {
		let componentFactory: ComponentFactory<any>;
		let componentType: any = this.slide.type;

		componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);
		this.componentRef = this.slideContainer.createComponent(componentFactory);
		this.componentRef.instance.init(this.slide, this.idx);
	}

}
