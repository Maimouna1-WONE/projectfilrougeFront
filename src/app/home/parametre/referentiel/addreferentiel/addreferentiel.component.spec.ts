import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreferentielComponent } from './addreferentiel.component';

describe('AddreferentielComponent', () => {
  let component: AddreferentielComponent;
  let fixture: ComponentFixture<AddreferentielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddreferentielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreferentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
