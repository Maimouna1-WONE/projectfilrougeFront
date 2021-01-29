import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantpromoprofilsortieComponent } from './apprenantpromoprofilsortie.component';

describe('ApprenantpromoprofilsortieComponent', () => {
  let component: ApprenantpromoprofilsortieComponent;
  let fixture: ComponentFixture<ApprenantpromoprofilsortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprenantpromoprofilsortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprenantpromoprofilsortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
