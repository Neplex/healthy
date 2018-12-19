import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HealthyApiService} from '../healthy-api/healthy-api.service';

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

	constructor(private api: HealthyApiService, private route: ActivatedRoute) {
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
}
