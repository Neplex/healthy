import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HomePage} from './home.page';
import {MapPage} from './map/map.page';
import {FavoritesPage} from './favorites/favorites.page';
import {SettingsPage} from './settings/settings.page';
import {AddStructurePage} from './map/add-structure/add-structure.page';
import {DetailsPage} from './map/details/details.page';
import {StructureTypeToStrModule} from '../structure-type-to-str/structure-type-to-str.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StructureTypeToStrModule
    ],
    entryComponents: [
        AddStructurePage,
        DetailsPage
    ],
    declarations: [HomePage, MapPage, AddStructurePage, DetailsPage, FavoritesPage, SettingsPage]
})
export class HomePageModule {
}
