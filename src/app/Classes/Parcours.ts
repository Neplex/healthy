import { Structure } from './Structure';

export class Parcours extends Structure {
	distance: number;
	//trace: geometrie;
	difficulte: number;

	constructor(nom: string, description:string, /*geom: geometrie,*/ telephone: number, distance: number, /*trace: geometrie, */difficulte: number) {
		super(nom,description,/*geom,*/ telephone);
		this.distance = distance;
		//this.trace = trace;
		this.difficulte = difficulte;
	}
}