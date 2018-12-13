import { Structure } from './Structure';

export class Salle extends Structure {

	taille: string;
	tarif: number;

	constructor(nom: string, description:string, /*geom: geometrie,*/ telephone: number, taille: string, tarif: number) {
		super(nom,description,/*geom,*/ telephone);
		this.tarif = tarif;
		this.taille = taille;
	}

}