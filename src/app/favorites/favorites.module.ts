import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {FavoritesPage} from './favorites.page';
import {HealthyApiModule} from '../healthy-api/healthy-api.module';

const routes: Routes = [
    {
        path: '',
        component: FavoritesPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HealthyApiModule,
        RouterModule.forChild(routes),

    ],
    declarations: [FavoritesPage]
})
export class FavoritesPageModule {
}
