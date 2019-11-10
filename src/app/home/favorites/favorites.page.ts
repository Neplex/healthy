import {Component, OnDestroy, OnInit} from '@angular/core';
import {HealthyApiService} from '../../healthy-api/healthy-api.service';
import {Structure} from '../../healthy-api/class/structure';
import {AlertController} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit, OnDestroy {

    public favorites: Structure[];
    private sub: Subscription;

    constructor(private api: HealthyApiService, private alert: AlertController) {
        /* Empty constructor */
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        this.sub = this.api.getUserFavorites().subscribe(data => {
            this.favorites = data;
            this.favorites.sort((a: Structure, b: Structure) => {
                let res = a.structure_type.localeCompare(b.structure_type);
                if (res === 0) {
                    res = a.name.localeCompare(b.name);
                }
                return res;
            });
        });

    }

    async delete(structure: Structure): Promise<void> {
        const confirm = await this.alert.create({
            header: 'Confirm suppression',
            message: 'You\'re about to delete this structure, are you sure ?',
            buttons: [
                {
                    text: 'Not anymore',
                    role: 'cancel',
                }, {
                    text: 'I am',
                    handler: () => {
                        const del = this.api.deleteStructure(structure).subscribe(() => {
                            del.unsubscribe();
                        });
                    }
                }
            ]
        });
        await confirm.present();
    }

}
