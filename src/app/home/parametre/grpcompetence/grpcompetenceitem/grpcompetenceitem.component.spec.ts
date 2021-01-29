import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpcompetenceitemComponent } from './grpcompetenceitem.component';

describe('GrpcompetenceitemComponent', () => {
  let component: GrpcompetenceitemComponent;
  let fixture: ComponentFixture<GrpcompetenceitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpcompetenceitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrpcompetenceitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
