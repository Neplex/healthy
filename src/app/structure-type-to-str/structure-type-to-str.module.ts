import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StructureTypeToStrPipe} from './structure-type-to-str.pipe';

@NgModule({
    declarations: [StructureTypeToStrPipe],
    imports: [
        CommonModule
    ],
    exports: [StructureTypeToStrPipe]
})
export class StructureTypeToStrModule {
}
