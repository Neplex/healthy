import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DetailsPage} from './details.page';

import {HealthyApiModule} from '../healthy-api/healthy-api.module';

const routes: Routes = [
    {
        path: '',
        component: DetailsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HealthyApiModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DetailsPage]
})
export class DetailsPageModule {
}
