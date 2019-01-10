import {Component, OnDestroy, OnInit} from '@angular/core';
import {toLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
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
import {DetailsPage} from '../details/details.page';

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
    views: View;
    positionFeature;
    userLayer: TileLayer;
    subS: Subscription;
    idF;
    coordinateFeature;

    constructor(private api: HealthyApiService, private modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.views = new View({
            center: [47.90289, 1.90389],
            zoom: 17
        });

        this.geolocation = new Geolocation({
            tracking: true,
            trackingOptions: {
                enableHighAccuracy: true
            },
            projection: this.views.getProjection()
        });

        this.positionFeature = new Feature();
        this.positionFeature.setStyle(new Style({
            image: new CircleStyle({
                radius: 6,
                fill: new Fill({
                    color: '#3399CC'
                }),
                stroke: new Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        }));

        this.userLayer = new VectorLayer({
            source: new VectorSource({
                features: [this.positionFeature]
            })
        });

        this.geolocation.on('change:position', () => {
            let coordinates = this.geolocation.getPosition();
            this.positionFeature.setGeometry(coordinates ?
                new Point(coordinates) : null);
        });

        this.layersMap.push(new TileLayer({
            source: new OSM()
        }));

        this.layersMap.push(this.userLayer);

        this.creaMap();

        this.map = new Map({
            target: 'map',
            layers: this.layersMap,
            view: this.views
        });

        let self = this;

        this.map.on('click', (e) => {
            let feature = self.map.forEachFeatureAtPixel(e.pixel,
                function (feature) {
                    return feature;
                });
            if (feature && feature != this.positionFeature) {
                this.coordinateFeature = toLonLat(feature.getGeometry().getCoordinates());
                this.subS = this.api.getAllStructures().subscribe(structures => {
                    for (let s of structures) {
                        if (this.coordinateFeature[0] == s.lng && this.coordinateFeature[1] == s.lat) {
                            this.idF = s.id;
                            this.modalCtrl.create({
                                component: DetailsPage,
                                componentProps: {
                                    id: this.idF
                                }
                            }).then((modal) => {
                                modal.present().then();
                            });
                            break;
                        }
                    }
                });
                console.log(this.idF);

            }
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

        /*this.sub = this.api.getAllStructuresAsGeoJSON().subscribe(() => {
            this.creaMap();
        });*/
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.subS.unsubscribe();
    }

    creaMap() {
        this.layersMap.push(new VectorLayer({
            source: new VectorSource({
                format: new GeoJSON,
                url: 'https://healthy-api-dev.herokuapp.com/v1/structures'
                //features: (new GeoJSON()).readFeatures(l)
            }),
            style: new Style({
                image: new CircleStyle({
                    radius: 6,
                    fill: new Fill({
                        color: '#cc161d'
                    }),
                    stroke: new Stroke({
                        color: '#ff6664',
                        width: 5
                    })
                })
            })
        }));
    }

    centered(): void {
        this.map.getView().setCenter(this.geolocation.getPosition());
    }
}
