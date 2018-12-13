import { Structure } from './Structure';

export class Hopital extends Structure {
	nivMaternite: number;
	service: string;

	constructor(nom: string, description:string, /*geom: geometrie,*/ telephone: number, nivMaternite: number, service:string){
		super(nom,description,/*geom,*/ telephone);
		this.nivMaternite = nivMaternite;
		this.service = service;
	}
}