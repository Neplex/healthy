import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, publishReplay, refCount, take} from 'rxjs/operators';

import {Bounds} from './class/bounds';
import {StructureType} from './class/structure-type.enum';
import {Hospital} from './class/hospital';
import {FitnessTrail} from './class/fitness-trail';
import {environment} from '../../environments/environment';


type AnyStructure = Hospital | FitnessTrail;

const BASE_URL = environment.healthyApiUrl;
const LOGIN_URL = BASE_URL + '/auth/login';
const LOGOUT_URL = BASE_URL + '/auth/logout';
const STRUCTURES_URL = BASE_URL + '/structures';
const USERS_URL = BASE_URL + '/users';


@Injectable({
    providedIn: 'root'
})
export class HealthyApiService implements OnDestroy {

    public token: string = null;


    constructor(private http: HttpClient) {
        /* Empty constructor */
    }


    // UTIL //

    private static geoToStructure(geo: object): AnyStructure {
        const geometry = geo['geometry'];
        const properties = geo['properties'];
        let structure: AnyStructure;

        switch (properties['structure_type']) {
            case StructureType.HOSPITAL:
                structure = <Hospital>properties;
                break;

            case StructureType.FITNESS_TRAIL:
                structure = <FitnessTrail>properties;
                break;
        }

        return structure;
    }

    private static structureToGeo(structure: AnyStructure): object {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [0, 0]
            },
            properties: <object>structure
        };
    }

    public isSignedIn(): boolean {
        return this.token !== null;
    }


    // AUTH //

    public signIn(username: string, password: string): Observable<void> {
        if (this.isSignedIn()) {
            this.signOut();
        }

        return this.http.post(LOGIN_URL, {'username': username, 'password': password}).pipe(
            take(1),
            map(payload => {
                this.token = payload['token'];
                return;
            })
        );
    }

    public signOut(): Observable<void> {
        return this.http.post(LOGOUT_URL, {}, this.getHttpOptions()).pipe(
            take(1),
            map(() => {
                this.token = null;
                return;
            }));
    }

    public getAllStructuresAsGeoJSON(bounds?: Bounds): Observable<object> {
        return this.http.get(STRUCTURES_URL, this.getHttpOptions()).pipe(
            take(1),
            publishReplay(1),
            refCount()
        );
    }


    // STRUCTURES //

    public getAllStructures(bounds?: Bounds): Observable<AnyStructure[]> {
        return this.getAllStructuresAsGeoJSON(bounds).pipe(
            map(geo => {
                const features = geo['features'];
                const data = [];

                for (let i = 0; i < features.length; i++) {
                    data.push(HealthyApiService.geoToStructure(features[i]));
                }

                return data;
            }),
            publishReplay(1),
            refCount()
        );
    }

    public getStructureByIdAsGeoJSON(id: number): Observable<object> {
        return this.http.get(STRUCTURES_URL + '/' + id, this.getHttpOptions()).pipe(
            take(1),
            publishReplay(1),
            refCount()
        );
    }

    public getStructureById(id: number): Observable<AnyStructure> {
        return this.getStructureByIdAsGeoJSON(id).pipe(
            map(geo => HealthyApiService.geoToStructure(geo)),
            publishReplay(1),
            refCount()
        );
    }

    public saveStructure(structure: Hospital): Observable<Hospital>;

    public saveStructure(structure: FitnessTrail): Observable<FitnessTrail>;

    public saveStructure(structure: AnyStructure): Observable<AnyStructure> {
        const geo = HealthyApiService.structureToGeo(structure);
        const options = this.getHttpOptions();
        let observable;
        console.log(geo);

        if (structure.id) {
            observable = this.http.put(STRUCTURES_URL + '/' + structure.id, geo, options);
        } else {
            observable = this.http.post(STRUCTURES_URL, geo, options);
        }

        return observable.pipe(map(geoResponse => HealthyApiService.geoToStructure(geoResponse)));
    }

    public deleteStructureById(id: number): Observable<object> {
        return this.http.delete(STRUCTURES_URL + '/' + id, this.getHttpOptions());
    }

    public deleteStructure(structure: AnyStructure): Observable<object> {
        return this.deleteStructureById(structure.id);
    }

    ngOnDestroy(): void {
        this.signOut();
    }

    // USERS //

    private getHttpOptions() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        if (this.token !== null) {
            headers.set('Authorization', this.token);
        }

        return {headers: headers};
    }
}
