import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {HealthyApiService} from './healthy-api.service';
import {StructureTypeToStrPipe} from './structure-type-to-str.pipe';

@NgModule({
    declarations: [StructureTypeToStrPipe],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [HealthyApiService],
    exports: [StructureTypeToStrPipe]
})
export class HealthyApiModule {
}
