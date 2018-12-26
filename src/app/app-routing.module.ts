import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
    {path: 'addStructure', loadChildren: './add-structure/add-structure.module#AddStructurePageModule'},
    {path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule'},
    {path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInPageModule'},
    {path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule'},
    {path: 'sign-in-form', loadChildren: './sign-in-form/sign-in-form.module#SignInFormPageModule'},
    {path: 'map', loadChildren: './map/map.module#MapPageModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
