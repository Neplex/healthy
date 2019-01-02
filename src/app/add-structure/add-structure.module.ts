import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AddStructurePage} from './add-structure.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HealthyApiModule} from '../healthy-api/healthy-api.module';

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
		HealthyApiModule,
		RouterModule.forChild(routes)
	],
	declarations: [AddStructurePage]
})
export class AddStructurePageModule {


}
