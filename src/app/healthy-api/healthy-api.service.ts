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


export type AnyStructure = Hospital | FitnessTrail | MedicalOffice | Gym;

interface GetStructuresOptions {
    bounds?: Bounds | number[];
    query?: string;
}

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

            case StructureType.GYM:
                structure = <Gym>properties;
                break;

            case StructureType.MEDICAL_OFFICE:
                structure = <MedicalOffice>properties;
                break;
        }

        if (structure) {
            structure.lat = geometry.coordinates[0];
            structure.lng = geometry.coordinates[1];
        }

        return structure;
    }

    private static structureToFeature(structure: AnyStructure): object {
        const coordinates = [structure.lng, structure.lat];
        delete structure.lat;
        delete structure.lng;

        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: coordinates
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
        const self = this;
        const signIn = this.http.post(LOGIN_URL, {'username': username, 'password': password}).pipe(
            take(1),
            map(payload => {
                self.token = payload['token'];
                return;
            })
        );

        if (this.isSignedIn()) {
            return concat(this.signOut(), signIn);
        }

        return signIn;
    }

    public signOut(): Observable<void> {
        const self = this;
        return this.http.post(LOGOUT_URL, {}, this.getHttpOptions()).pipe(
            take(1),
            map(() => {
                self.token = null;
                return;
            }));
    }

    // STRUCTURES //

    public getAllStructuresAsGeoJSON(options?: GetStructuresOptions): Observable<object> {
        if (options && options.bounds instanceof Bounds) {
            options.bounds = [
                options.bounds.min_lat,
                options.bounds.min_lng,
                options.bounds.max_lat,
                options.bounds.max_lng
            ];
        }

        return this.http.get(STRUCTURES_URL, this.getHttpOptions(options)).pipe(
            take(1),
            publishReplay(1),
            refCount()
        );
    }

    public getAllStructures(options?: GetStructuresOptions): Observable<AnyStructure[]> {
        return this.getAllStructuresAsGeoJSON(options).pipe(
            map(geo => HealthyApiService.featureCollectionToStructureList(geo)),
            publishReplay(1),
            refCount()
        );
    }

    public getStructureByIdAsGeoJSON(id: number, target?: number[]): Observable<object> {
        return this.http.get(STRUCTURES_URL + '/' + id, this.getHttpOptions({distanceFrom: target})).pipe(
            take(1),
            publishReplay(1),
            refCount()
        );
    }

    public getStructureById(id: number, target?: number[]): Observable<AnyStructure> {
        return this.getStructureByIdAsGeoJSON(id, target).pipe(
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

    public getUserById(id?: number): Observable<User> {
        if (!id) {
            id = this.getTokenIdentity();
        }
        return this.http.get(USERS_URL + '/' + id, this.getHttpOptions()).pipe(
            take(1),
            map(data => <User>data),
            publishReplay(1),
            refCount()
        );
    }

    public getUserStructuresAsGeoJSON(user?: User | number): Observable<object> {
        if (!user) {
            user = this.getTokenIdentity();
        }

        if (user instanceof User) {
            user = user.id;
        }

        return this.http.get(USERS_URL + '/' + user + '/structures', this.getHttpOptions()).pipe(
            take(1),
            publishReplay(1),
            refCount()
        );
    }

    public getUserStructures(user?: User | number): Observable<AnyStructure[]> {
        return this.getUserStructuresAsGeoJSON(user).pipe(
            map(geo => HealthyApiService.featureCollectionToStructureList(geo)),
            publishReplay(1),
            refCount()
        );
    }

    public getUserFavoritesAsGeoJSON(user?: User | number): Observable<object> {
        if (!user) {
            user = this.getTokenIdentity();
        }

        if (user instanceof User) {
            user = user.id;
        }

        return this.http.get(USERS_URL + '/' + user + '/favorites', this.getHttpOptions()).pipe(
            take(1),
            publishReplay(1),
            refCount()
        );
    }

    public getUserFavorites(user?: User | number): Observable<AnyStructure[]> {
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

    public addUserFavoriteById(favorite_id: number, user_id?: number): Observable<void> {
        if (!user_id) {
            user_id = this.getTokenIdentity();
        }

        return this.http.post(USERS_URL + '/' + user_id + '/favorites', {
            'structure_id': favorite_id
        }, this.getHttpOptions()).pipe(
            map(() => {
                return;
            })
        );
    }

    public addUserFavorite(favorite: AnyStructure, user_id?: number): Observable<void> {
        return this.addUserFavoriteById(favorite.id, user_id);
    }

    public deleteUserById(id?: number): Observable<object> {
        if (!id) {
            id = this.getTokenIdentity();
        }
        return this.http.delete(USERS_URL + '/' + id, this.getHttpOptions());
    }

    public deleteUser(user?: User): Observable<object> {
        return this.deleteStructureById(user.id);
    }

    public deleteUserFavoriteById(favorite_id: number, user_id?: number): Observable<void> {
        if (!user_id) {
            user_id = this.getTokenIdentity();
        }

        return this.http.delete(USERS_URL + '/' + user_id + '/favorites/' + favorite_id,
            this.getHttpOptions()).pipe(map(() => {
                return;
            })
        );
    }

    public deleteUserFavorite(favorite: AnyStructure, user_id?: number): Observable<void> {
        return this.deleteUserFavoriteById(favorite.id, user_id);
    }

    // UTILS //

    public isSignedIn(): boolean {
        return this.token !== null;
    }

    ngOnDestroy(): void {
        this.signOut();
    }

    private getHttpOptions(): { headers };
    private getHttpOptions(params: object): { headers, params };
    private getHttpOptions(params?: object) {
        let headers;

        if (this.isSignedIn()) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.token
            });
        } else {
            headers = new HttpHeaders({
                'Content-Type': 'application/json'
            });
        }

        return params ? {headers: headers, params: params} : {headers: headers};
    }

    private getTokenIdentity() {
        try {
            const decoded = JSON.parse(atob(this.token.split('.')[1]));
            return decoded['identity'];
        } catch (e) {
            return null;
        }
    }
}
