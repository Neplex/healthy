import {TestBed} from '@angular/core/testing';

import {HealthyApiService} from './healthy-api.service';

describe('HealthyApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: HealthyApiService = TestBed.get(HealthyApiService);
        expect(service).toBeTruthy();
    });
});
