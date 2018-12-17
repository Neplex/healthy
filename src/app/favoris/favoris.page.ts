import {Component, OnDestroy, OnInit} from '@angular/core';
import {HealthyApiService} from '../healthy-api/healthy-api.service';
import {Structure} from '../healthy-api/class/structure';

@Component({
	selector: 'app-favoris',
	templateUrl: './favoris.page.html',
	styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit, OnDestroy {

	structselect: any;
	favoris;
	sub;

	constructor(private api: HealthyApiService) {
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

	delete(structure: Structure): void {
		this.api.deleteStructure(structure);
	}

}
