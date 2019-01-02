import {Pipe, PipeTransform} from '@angular/core';
import {Structure} from './class/structure';
import {StructureType} from './class/structure-type.enum';

@Pipe({
    name: 'structureTypeToStr'
})
export class StructureTypeToStrPipe implements PipeTransform {

    transform(value: StructureType | Structure, args?: any): string {
        if (value instanceof Structure) {
            value = value.structure_type;
        }
        switch (value) {
            case StructureType.HOSPITAL:
                return 'Hospital';
            case StructureType.FITNESS_TRAIL:
                return 'Fitness trail';
            case StructureType.MEDICAL_OFFICE:
                return 'Medical office';
            case StructureType.GYM:
                return 'Gym';
        }
        return null;
    }

}
