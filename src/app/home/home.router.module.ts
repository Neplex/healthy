import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomePage} from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'map',
                loadChildren: '../map/map.module#MapPageModule'
            }, {
                path: 'favorites',
                loadChildren: '../favorites/favorites.module#FavoritesPageModule'
            }, {
                path: 'settings',
                loadChildren: '../settings/settings.module#SettingsPageModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomePageRoutingModule {
}
