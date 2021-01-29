import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpcompetenceComponent } from './grpcompetence.component';

describe('GrpcompetenceComponent', () => {
  let component: GrpcompetenceComponent;
  let fixture: ComponentFixture<GrpcompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpcompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrpcompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
