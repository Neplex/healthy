import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddStructurePage} from './add-structure.page';

describe('AddStructurePage', () => {
  let component: AddStructurePage;
  let fixture: ComponentFixture<AddStructurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStructurePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStructurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
