import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignInFormPage} from './sign-in-form.page';

describe('SignInFormPage', () => {
    let component: SignInFormPage;
    let fixture: ComponentFixture<SignInFormPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SignInFormPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignInFormPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
