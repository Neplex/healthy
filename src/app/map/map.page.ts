import {Component, OnDestroy, OnInit} from '@angular/core';
import {toLonLat} from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Geolocation from 'ol/Geolocation';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import BaseLayer from 'ol/layer/Base';
import {HealthyApiService} from '../healthy-api/healthy-api.service';
import {Subscription} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {AddStructurePage} from '../add-structure/add-structure.page';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {

    layersMap: BaseLayer[] = [];
    map: Map;
    sub: Subscription;
    geolocation;

    constructor(private api: HealthyApiService, private modalCtrl: ModalController) {
    }

    ngOnInit() {

        this.geolocation = new Geolocation({
            tracking: true
        });

        this.layersMap.push(new TileLayer({
            source: new OSM()
        }));

        this.layersMap.push(new TileLayer({
            source: new OSM()
        }));

        this.map = new Map({
            target: 'map',
            layers: this.layersMap,
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });

        this.map.on('dblclick', (e) => {
            let coordinates = toLonLat(e.coordinate);
            this.modalCtrl.create({
                component: AddStructurePage,
                componentProps: {coordinates: coordinates}
            }).then((modal) => {
                modal.present().then();
            });
        });

        this.map.on('singleclick', function (e) {
            let pixel = e.pixel;
            let hit = false;
            this.map.forEachFeatureAtPixel(pixel, function () {
                hit = true;
            }, {
                hitTolerance: 5
            });
            if (hit) {
                console.log('hit');
                let coordinates = e.coordinates;
                this.nav.navigateForward('/addStructure', true, coordinates).then();
            }
        });

        this.sub = this.api.getAllStructuresAsGeoJSON().subscribe(data => {
            this.creaMap(data);
        });
    }

    creaMap(l: object) {
        this.layersMap.push(new VectorLayer({
            source: new VectorSource({
                features: (new GeoJSON()).readFeatures(l)
            }),
        }));
    }

    creaMap(l: object) {
        this.layersMap.push(new VectorLayer({
            source: new VectorSource({
                features: (new GeoJSON()).readFeatures(l)
            }),
        }));
    }
}
