import {Structure} from './structure';
import {StructureType} from './structure-type.enum';

export class Hospital extends Structure {

    constructor(name: string, description: string, public emergency: boolean, public maternity: boolean) {
        super(StructureType.HOSPITAL, name, description);
    }
}
