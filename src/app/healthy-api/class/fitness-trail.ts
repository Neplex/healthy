import {Structure} from './structure';
import {StructureType} from './structure-type.enum';

export class FitnessTrail extends Structure {

    constructor(name: string, description: string, public difficulty: number) {
        super(StructureType.FITNESS_TRAIL, name, description);
    }
}
