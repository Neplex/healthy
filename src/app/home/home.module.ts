import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {HomePageRoutingModule} from './home.router.module';
import {HomePage} from './home.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        HomePageRoutingModule
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
