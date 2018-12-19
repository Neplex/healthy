import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {concat, Observable} from 'rxjs';
import {map, publishReplay, refCount, take} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Bounds} from './class/bounds';
import {Structure} from './class/structure';
import {StructureType} from './class/structure-type.enum';
import {Hospital} from './class/hospital';
import {FitnessTrail} from './class/fitness-trail';
import {MedicalOffice} from './class/medical-office';
import {Gym} from './class/gym';
import {User} from './class/user';


type AnyStructure = Hospital | FitnessTrail | MedicalOffice | Gym;

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


    // CONVERSIONS //
    // TODO: store geometry in structures

    private static featureToStructure(geo: object): AnyStructure {
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

    private static structureToFeature(structure: AnyStructure): object {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [0, 0]
            },
            properties: <object>structure
        };
    }

    private static featureCollectionToStructureList(geo: object): AnyStructure[] {
        const features = geo['features'];
        const data = [];

        for (let i = 0; i < features.length; i++) {
            data.push(HealthyApiService.featureToStructure(features[i]));
        }

        return data;
    }


    // AUTH //

    public signIn(username: string, password: string): Observable<void> {
        const signIn = this.http.post(LOGIN_URL, {'username': username, 'password': password}).pipe(
            take(1),
            map(payload => {
                this.token = payload['token'];
                return;
            })
        );

        if (this.isSignedIn()) {
            return concat(this.signOut(), signIn);
        }

        return signIn;
    }

    public signOut(): Observable<void> {
        return this.http.post(LOGOUT_URL, {}, this.getHttpOptions()).pipe(
            take(1),
            map(() => {
                this.token = null;
                return;
            }));
    }

    // STRUCTURES //

    public getAllStructuresAsGeoJSON(bounds?: Bounds): Observable<object> {
        return this.http.get(STRUCTURES_URL, this.getHttpOptions()).pipe(
            take(1),
            publishReplay(1),
            refCount()
        );
    }

    public getAllStructures(bounds?: Bounds): Observable<AnyStructure[]> {
        return this.getAllStructuresAsGeoJSON(bounds).pipe(
            map(geo => HealthyApiService.featureCollectionToStructureList(geo)),
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
            map(geo => HealthyApiService.featureToStructure(geo)),
            publishReplay(1),
            refCount()
        );
    }

    public saveStructure(structure: Hospital): Observable<Hospital>;
    public saveStructure(structure: FitnessTrail): Observable<FitnessTrail>;
    public saveStructure(structure: MedicalOffice): Observable<MedicalOffice>;
    public saveStructure(structure: Gym): Observable<Gym>;
    public saveStructure(structure: AnyStructure): Observable<AnyStructure> {
        const geo = HealthyApiService.structureToFeature(structure);
        const options = this.getHttpOptions();
        let observable;

        if (structure.id) {
            observable = this.http.put(STRUCTURES_URL + '/' + structure.id, geo, options);
        } else {
            observable = this.http.post(STRUCTURES_URL, geo, options);
        }

        return observable.pipe(
            take(1),
            map(geoResponse => HealthyApiService.featureToStructure(geoResponse))
        );
    }

    public deleteStructureById(id: number): Observable<object> {
        return this.http.delete(STRUCTURES_URL + '/' + id, this.getHttpOptions());
    }

    public deleteStructure(structure: AnyStructure | Structure): Observable<object> {
        return this.deleteStructureById(structure.id);
    }

    // USERS //

    public getAllUsers(): Observable<User[]> {
        return this.http.get(USERS_URL, this.getHttpOptions()).pipe(
            take(1),
            map(data => <User[]>data),
            publishReplay(1),
            refCount()
        );
    }

    public getUserById(id: number): Observable<User> {
        return this.http.get(USERS_URL + '/' + id, this.getHttpOptions()).pipe(
            take(1),
            map(data => <User>data),
            publishReplay(1),
            refCount()
        );
    }

    public getUserStructuresAsGeoJSON(user: User | number): Observable<object> {
        if (user instanceof User) {
            user = user.id;
        }

        return this.http.get(USERS_URL + '/' + user + '/structures', this.getHttpOptions()).pipe(
            take(1),
            publishReplay(1),
            refCount()
        );
    }

    public getUserStructures(user: User | number): Observable<AnyStructure[]> {
        return this.getUserStructuresAsGeoJSON(user).pipe(
            map(geo => HealthyApiService.featureCollectionToStructureList(geo)),
            publishReplay(1),
            refCount()
        );
    }

    public getUserFavoritesAsGeoJSON(user: User | number): Observable<object> {
        if (user instanceof User) {
            user = user.id;
        }

        return this.http.get(USERS_URL + '/' + user + '/favorites', this.getHttpOptions()).pipe(
            take(1),
            publishReplay(1),
            refCount()
        );
    }

    public getUserFavorites(user: User | number): Observable<AnyStructure[]> {
        return this.getUserFavoritesAsGeoJSON(user).pipe(
            map(geo => HealthyApiService.featureCollectionToStructureList(geo)),
            publishReplay(1),
            refCount()
        );
    }

    public saveUser(user: User): Observable<User> {
        const data = <object>user;
        const options = this.getHttpOptions();
        let observable;

        if (user.id) {
            observable = this.http.put(USERS_URL + '/' + user.id, data, options);
        } else {
            observable = this.http.post(USERS_URL, data, options);
        }

        return observable.pipe(
            take(1),
            map(new_data => <User>new_data)
        );
    }

    public deleteUserById(id: number): Observable<object> {
        return this.http.delete(USERS_URL + '/' + id, this.getHttpOptions());
    }

    public deleteUser(user: User): Observable<object> {
        return this.deleteStructureById(user.id);
    }

    // UTILS //

    public isSignedIn(): boolean {
        return this.token !== null;
    }

    ngOnDestroy(): void {
        this.signOut();
    }

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
