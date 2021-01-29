import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantprofilsortiepromoComponent } from './apprenantprofilsortiepromo.component';

describe('ApprenantprofilsortiepromoComponent', () => {
  let component: ApprenantprofilsortiepromoComponent;
  let fixture: ComponentFixture<ApprenantprofilsortiepromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprenantprofilsortiepromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprenantprofilsortiepromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
