import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcompetenceComponent } from './addcompetence.component';

describe('AddcompetenceComponent', () => {
  let component: AddcompetenceComponent;
  let fixture: ComponentFixture<AddcompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
