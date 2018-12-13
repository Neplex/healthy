import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Cabinet} from '../Classes/Cabinet';
import {Hopital} from '../Classes/Hopital';
import {Parcours} from '../Classes/Parcours';
import {Salle} from '../Classes/Salle';

@Component({
  selector: 'app-add-structure',
  templateUrl: './add-structure.page.html',
  styleUrls: ['./add-structure.page.scss'],
})

export class AddStructurePage implements OnInit {


	structureForm: FormGroup;

	// Champs pour la création d'une structure

	nomStructure: string;
	telephoneStructure: number;
	descriptionStructure: string;
	typeStructure: string;
	options: any[] = [
		{key:'0', name:"Cabinet médical"},
		{key:'1', name:"Hôpital"},
		{key:'2', name:"Parcours de santé"},
		{key:'3', name:"Salle de sport"}
	];

	// Champs pour un cabinet

	specialite: string;
	medecins: string;
	tailleCab: string;

	// Champs pour un hôpital

	nivMaternite: number;
	services: string;

	// Champs pour un parcours

	distance: string;
	//geom: '',
	difficulte: string;

	// Champs pour une salle

	tailleSalle: string;
	tarif: string;


	constructor(private formBuilder: FormBuilder) {}


	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.structureForm = this.formBuilder.group({
			nomStructure: '',
			telephoneStructure:'',
			descriptionStructure: '',

			//cabinet
			specialite: '',
			medecins: '',
			tailleCab: '',

			//hôpital
			nivMaternite: '',
			services: '',

			//parcours
			distance: '',
			//geom: '',
			difficulte: '',

			//salle
			tailleSalle: '',
			tarif: ''
		})
	}

	onSubmit() {
		const formValue = this.structureForm.value;
		let structure;
		switch (this.typeStructure) {
			case this.options[0].name:
					structure = new Cabinet(
					formValue['nomStructure'],
					formValue['descriptionStructure'],
					formValue['telephoneStructure'],
					formValue['specialite'],
					formValue['medecins'],
					formValue['tailleCab']
				);
				break;
			case this.options[1].name:
					structure = new Hopital(
					formValue['nomStructure'],
					formValue['descriptionStructure'],
					formValue['telephoneStructure'],
					formValue['nivMaternite'],
					formValue['services']
				);
				break;
			case this.options[2].name:
					structure = new Parcours(
					formValue['nomStructure'],
					formValue['descriptionStructure'],
					formValue['telephoneStructure'],
					formValue['distance'],
					//formValue['geom'],
					formValue['difficulte']
				);
				break;
			case this.options[3].name:
					structure = new Salle(
					formValue['nomStructure'],
					formValue['descriptionStructure'],
					formValue['telephoneStructure'],
					formValue['tailleSalle'],
					formValue['tarif'],
				);
				break;
			default:
		}

		// envoyer structure BD

	}
}
