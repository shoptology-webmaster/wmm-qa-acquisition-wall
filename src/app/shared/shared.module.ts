import { SlidesService } from './slides.service';
import { TextSlideComponent } from './slides/text-slide.component';
import { FactTopSlideComponent } from './slides/fact-top-slide.component';
import { FactBottomSlideComponent } from './slides/fact-bottom-slide.component';
import { SlideContainerComponent } from './slide-container.component';
import { ProductSlideComponent } from './slides/product-slide.component';
import { AccentColorDirective } from './accentColor.directive';
import { GetCacheUrlPipe } from './pipes/getCacheUrl.pipe';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { IonicModule } from 'ionic-angular';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule
	],
	declarations: [
		ProductSlideComponent,
		FactBottomSlideComponent,
		FactTopSlideComponent,
		TextSlideComponent,
		SlideContainerComponent,
		AccentColorDirective,
		GetCacheUrlPipe
	],
	providers: [
		SlidesService
	],
	entryComponents: [
		ProductSlideComponent,
		FactBottomSlideComponent,
		FactTopSlideComponent,
		TextSlideComponent
	],
	exports: [
		CommonModule,
		FormsModule,
		ProductSlideComponent,
		FactBottomSlideComponent,
		FactTopSlideComponent,
		TextSlideComponent,
		SlideContainerComponent,
		AccentColorDirective,
		GetCacheUrlPipe
	]
})
export class SharedModule { }
