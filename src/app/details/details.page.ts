import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HealthyApiService} from '../healthy-api/healthy-api.service';
import {Structure} from '../healthy-api/class/structure';
import {AlertController} from '@ionic/angular';

@Component({
	selector: 'app-details',
	templateUrl: './details.page.html',
	styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {

	id: string;
	sub;
	subProp;
	subFav;
	structure;
	properties = [];
	isfav;

	constructor(private api: HealthyApiService, private route: ActivatedRoute, private alert: AlertController) {
	}

	ngOnInit() {
		this.sub = this.route.paramMap.subscribe(params => this.id = params.get('id'));
		this.subProp = this.api.getStructureById(+this.id).subscribe(params => {
			this.structure = params;
			this.properties = Object.getOwnPropertyNames(this.structure);
			this.subFav = this.api.getUserFavorites().subscribe(params => {
				this.isfav = params.indexOf(this.structure) >= 0;
				this.subFav.unsubscribe();
			});
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
		this.subProp.unsubscribe();
	}

	async popUp(structure: Structure): Promise<void> {
		const alerte = await this.alert.create({
			header: 'Already in your Fav',
			message: 'Do you want to remove this structure from your favorites ?',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
				}, {
					text: 'Yes',
					handler: () => {
						/*	const del = this.api. TODO: remove favorite(structure).subscribe(() => {
								del.unsubscribe();
							});*/
					}
				}
			]
		});
		await alerte.present();
	}


	addFavorite(): void {
		if (this.isfav) {
			this.popUp(this.structure).then();
		} else {
			// TODO: add favorite
		}
	}
}
