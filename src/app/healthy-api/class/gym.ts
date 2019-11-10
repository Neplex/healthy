import {Structure} from './structure';
import {StructureType} from './structure-type.enum';

export class Gym extends Structure {

    constructor(name: string, description: string, public phone: string, public price: number) {
        super(StructureType.GYM, name, description);
    }
}
