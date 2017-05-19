import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { SharedModule } from '../shared/shared.module';

import { PassivePage } from './passive/passive.page';
import { LoadPage } from './load/load.page';
import { SetupPage } from './setup/setup.page';
import { ChooseSlidePage } from './choose-slide/choose-slide.page';
import { ExhibitPage } from './exhibit/exhibit.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		SharedModule
	],
	declarations: [
		PassivePage,
		LoadPage,
		SetupPage,
		ChooseSlidePage,
		ExhibitPage
	],
	providers: [

	],
	exports: [
		PassivePage,
		LoadPage,
		SetupPage,
		ChooseSlidePage,
		ExhibitPage
	],
	entryComponents: [
		PassivePage,
		LoadPage,
		SetupPage,
		ChooseSlidePage,
		ExhibitPage
	]
})
export class PagesModule { }
