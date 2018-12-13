

export class Structure{
	nom: string;
	description: string;
	//geom: geometrie;
	telephone: number;

	constructor(nom: string, description:string, /*geom: geometrie,*/ telephone: number) {
		this.nom = nom;
		this.description = description;
		//this.geom = geom;
		this.telephone = telephone;
	}
}