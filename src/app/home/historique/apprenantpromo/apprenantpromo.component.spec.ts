import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantpromoComponent } from './apprenantpromo.component';

describe('ApprenantpromoComponent', () => {
  let component: ApprenantpromoComponent;
  let fixture: ComponentFixture<ApprenantpromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprenantpromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprenantpromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
