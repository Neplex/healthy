import {StructureType} from './structure-type.enum';

export class Structure {
    public id?: number;
    protected geometry: string; // GeoJSON string

    protected constructor(public readonly structure_type: StructureType, public name: string, public description: string = '') {
    }
}
