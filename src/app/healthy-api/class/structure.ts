import {StructureType} from './structure-type.enum';

export class Structure {
    public id?: number;
    protected geometry: string; // GeoJSON string

    protected constructor(public readonly structure_type: StructureType, public name: string, public description: string = '') {
    }

	public getType(): string {
		switch (this.structure_type) {
			case StructureType.HOSPITAL:
				return 'Hospital';
			case StructureType.FITNESS_TRAIL:
				return 'Fitness trail';
			case StructureType.MEDICAL_OFFICE:
				return 'Medical office';
			case StructureType.GYM:
				return 'Gym';
		}
	}
}
