import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home/home.page';
import {SignInPage} from './sign-in/sign-in.page';
import {MapPage} from './home/map/map.page';
import {FavoritesPage} from './home/favorites/favorites.page';
import {SettingsPage} from './home/settings/settings.page';

const routes: Routes = [
    {
        path: '', redirectTo: 'sign-in', pathMatch: 'full'
    },
    {
        path: 'home', component: HomePage, children: [
            {
                path: 'map',
                component: MapPage
            }, {
                path: 'favorites',
                component: FavoritesPage
            }, {
                path: 'settings',
                component: SettingsPage
            }
        ]
    },
    {
        path: 'sign-in', component: SignInPage
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
