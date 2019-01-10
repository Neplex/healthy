import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StructureType} from '../healthy-api/class/structure-type.enum';
import {HealthyApiService} from '../healthy-api/healthy-api.service';
import {MedicalOffice} from '../healthy-api/class/medical-office';
import {Hospital} from '../healthy-api/class/hospital';
import {FitnessTrail} from '../healthy-api/class/fitness-trail';
import {Gym} from '../healthy-api/class/gym';
import {ModalController, NavParams} from '@ionic/angular';


@Component({
    selector: 'app-add-structure',
    templateUrl: './add-structure.page.html',
    styleUrls: ['./add-structure.page.scss'],
})
export class AddStructurePage implements OnInit, OnDestroy {

    structureForm: FormGroup;
    sub;
    typeStructure: string;
    structureType = StructureType;
    structureTypeList = Object.values(StructureType);

    constructor(
        private formBuilder: FormBuilder, private api: HealthyApiService,
        private modalCtrl: ModalController, private navParams: NavParams
    ) {
        this.initForm();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    initForm() {
        this.structureForm = this.formBuilder.group({
            name: new FormControl('', {
                validators: Validators.required,
                updateOn: 'submit'
            }),
            phone: new FormControl('', {
                validators: Validators.required,
                updateOn: 'submit'
            }),
            description: new FormControl('', Validators.nullValidator),

            // cabinet
            specialities: new FormControl('', {
                validators: Validators.required,
                updateOn: 'submit'
            }),
            medecins: '',

            // hôpital
            maternity: new FormControl(false, {
                validators: Validators.required,
                updateOn: 'submit'
            }),
            emergency: new FormControl(false, {
                validators: Validators.required,
                updateOn: 'submit'
            }),

            // parcours
            difficulty: '',

            // salle
            price: ''
        });
    }

    onSubmit() {
        const formValue = this.structureForm.value;
        let structure;
        switch (this.typeStructure) {
            case StructureType.MEDICAL_OFFICE:
                structure = <MedicalOffice>formValue;
                break;
            case StructureType.HOSPITAL:
                structure = new Hospital(formValue.name, formValue.description, formValue.phone, formValue.emergency, formValue.maternity);
                break;
            case StructureType.FITNESS_TRAIL:
                structure = <FitnessTrail>formValue;
                break;
            case StructureType.GYM:
                structure = <Gym>formValue;
                break;
            default:
        }
        let coords = this.navParams.get('coordinates');
        structure.lng = coords[0];
        structure.lat = coords[1];
        this.sub = this.api.saveStructure(structure).subscribe(() => this.goBack());
    }

    public goBack() {
        this.modalCtrl.dismiss().then();
    }
}
