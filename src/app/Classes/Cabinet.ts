import { Structure } from './Structure';

export class Cabinet extends Structure {
	 specialite: string;
	 medecins: string;
	 taille: string;

	 constructor(nom: string, description:string, /*geom: geometrie,*/ telephone: number, specialite: string, medecins: string, taille: string) {
		 super(nom,description,/*geom,*/ telephone);
	 	this.medecins = medecins;
	 	this.specialite = specialite;
	 	this.taille = taille;
	 }

}