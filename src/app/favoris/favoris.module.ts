import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {FavorisPage} from './favoris.page';

import {StructureTypeToStrPipe} from '../structure-type-to-str.pipe';

const routes: Routes = [
	{
		path: '',
		component: FavorisPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),

	],
	declarations: [FavorisPage, StructureTypeToStrPipe]
})
export class FavorisPageModule {
}
