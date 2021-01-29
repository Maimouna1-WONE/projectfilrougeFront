import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilsortieComponent } from './profilsortie.component';

describe('ProfilsortieComponent', () => {
  let component: ProfilsortieComponent;
  let fixture: ComponentFixture<ProfilsortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilsortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilsortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
