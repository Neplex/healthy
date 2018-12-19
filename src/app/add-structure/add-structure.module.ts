import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AddStructurePage} from './add-structure.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {StructureTypeToStrPipe} from '../structure-type-to-str.pipe';

const routes: Routes = [
	{
		path: '',
		component: AddStructurePage
	}
];

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes)
	],
	declarations: [AddStructurePage, StructureTypeToStrPipe]
})
export class AddStructurePageModule {


}
