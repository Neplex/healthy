import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {FavoritesPage} from './favorites.page';
import {StructureTypeToStrPipe} from '../structure-type-to-str.pipe';

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
        RouterModule.forChild(routes),

    ],
    declarations: [FavoritesPage, StructureTypeToStrPipe]
})
export class FavoritesPageModule {
}
