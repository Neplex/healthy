import {StructureType} from './structure-type.enum';

export class Structure {
    public id?: number;
    public lat?: number;
    public lng?: number;

    protected constructor(public readonly structure_type: StructureType, public name: string, public description: string = '') {
    }
}
