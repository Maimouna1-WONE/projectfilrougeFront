import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferentielitemComponent } from './referentielitem.component';

describe('ReferentielitemComponent', () => {
  let component: ReferentielitemComponent;
  let fixture: ComponentFixture<ReferentielitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferentielitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferentielitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
