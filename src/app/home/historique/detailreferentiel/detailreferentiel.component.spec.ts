import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailreferentielComponent } from './detailreferentiel.component';

describe('DetailreferentielComponent', () => {
  let component: DetailreferentielComponent;
  let fixture: ComponentFixture<DetailreferentielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailreferentielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailreferentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
