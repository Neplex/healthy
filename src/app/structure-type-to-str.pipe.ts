import {Pipe, PipeTransform} from '@angular/core';
import {StructureType} from './healthy-api/class/structure-type.enum';
import {Structure} from './healthy-api/class/structure';

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
