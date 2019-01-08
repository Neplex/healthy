import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {MapPage} from './map.page';
import {AddStructurePage} from '../add-structure/add-structure.page';
import {HealthyApiModule} from '../healthy-api/healthy-api.module';

const routes: Routes = [
    {
        path: '',
        component: MapPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        HealthyApiModule,
        RouterModule.forChild(routes),
    ],
    entryComponents: [
        AddStructurePage
    ],
    declarations: [
        AddStructurePage,
        MapPage
    ]
})
export class MapPageModule {
}
