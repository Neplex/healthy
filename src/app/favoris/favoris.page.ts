import {Component, OnDestroy, OnInit} from '@angular/core';
import {HealthyApiService} from '../healthy-api/healthy-api.service';
import {Structure} from '../healthy-api/class/structure';
import {AlertController} from '@ionic/angular';

@Component({
	selector: 'app-favoris',
	templateUrl: './favoris.page.html',
	styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit, OnDestroy {

	favoris;
	sub;

	constructor(private api: HealthyApiService, private alert: AlertController) {
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	ngOnInit() {
		this.sub = this.api.getAllStructures().subscribe(
			data => {
				this.favoris = data;
				this.favoris.sort((a: Structure, b: Structure) => {
					let res = a.structure_type.localeCompare(b.structure_type);
					if (res == 0) {
						res = a.name.localeCompare(b.name);
					}
					return res;
				});
			}); // TODO: change to favorites

	}

	async delete(structure: Structure): Promise<void> {
		let confirm = await this.alert.create({
			header: 'Confirm suppression',
			message: 'You\'re about to delete this structure, are you sure ?',
			buttons: [
				{
					text: 'Not anymore',
					role: 'cancel',
				}, {
					text: 'I am',
					handler: () => {
						let del = this.api.deleteStructure(structure).subscribe(() => {
							del.unsubscribe();
						});
					}
				}
			]
		});
		await confirm.present();
	}

}
