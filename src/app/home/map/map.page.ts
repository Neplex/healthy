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
import {HealthyApiService} from '../../healthy-api/healthy-api.service';
import {Subscription} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {AddStructurePage} from './add-structure/add-structure.page';
import {DetailsPage} from './details/details.page';

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

    constructor(private api: HealthyApiService, private modalCtrl: ModalController) {
    }

    ngOnInit() {


        this.views = new View({
            center: [1.90, 47.19],
            zoom: 17,
            projection: 'EPSG:4326'
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
            const coordinates = this.geolocation.getPosition();
            this.positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
        });

        this.layersMap.push(new TileLayer({
            source: new OSM()
        }));

        this.layersMap.push(this.userLayer);

        const sub = this.api.getAllStructuresAsGeoJSON().subscribe((data) => {
            this.creaMap(data);

            this.map = new Map({
                target: 'map',
                layers: this.layersMap,
                view: this.views
            });

            const self = this;
            this.map.on('click', (e) => {
                const feature = self.map.forEachFeatureAtPixel(e.pixel, (f) => f);
                if (feature && feature !== this.positionFeature) {
                    this.modalCtrl.create({
                        component: DetailsPage,
                        componentProps: {
                            id: feature.values_.id
                        }
                    }).then((modal) => {
                        modal.present().then();
                    });

                }
            });

            this.map.on('dblclick', (e) => {
                const coordinates = toLonLat(e.coordinate);
                this.modalCtrl.create({
                    component: AddStructurePage,
                    componentProps: {coordinates: coordinates}
                }).then((modal) => {
                    modal.present().then();
                });
            });

            sub.unsubscribe();
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.subS.unsubscribe();
    }

    creaMap(l) {
        this.layersMap.push(new VectorLayer({
            source: new VectorSource({
                features: (new GeoJSON()).readFeatures(l)
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
