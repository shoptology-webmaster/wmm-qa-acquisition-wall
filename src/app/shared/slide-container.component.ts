import { Component, Input, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver, ViewChild, Type } from '@angular/core';


@Component({
	selector: 'slide-container',
	template: `
		<ng-template #slideContainer></ng-template>
	`
})
export class SlideContainerComponent {
	@Input() slide: any;
	@Input() idx: any;
	@ViewChild('slideContainer', {read: ViewContainerRef}) slideContainer: ViewContainerRef;

	constructor(
		public viewContainerRef: ViewContainerRef,
		private _componentFactoryResolver: ComponentFactoryResolver,
		private _vcr: ViewContainerRef
	) {}

	ngOnInit() {
	    this.loadComponent();
	}

	loadComponent() {
		let componentFactory: ComponentFactory<any>;
		let componentType: any = this.slide.type;

		componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);
		let componentRef = this.slideContainer.createComponent(componentFactory);
		componentRef.instance.init(this.slide, this.idx);
	}

}
