import {Structure} from './structure';
import {StructureType} from './structure-type.enum';

export class MedicalOffice extends Structure {

    constructor(name: string, description: string, public phone: string, public specialities: string[], public medecins: string[]) {
        super(StructureType.MEDICAL_OFFICE, name, description);
    }
}
