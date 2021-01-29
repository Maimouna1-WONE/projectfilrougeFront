import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatereferentielComponent } from './updatereferentiel.component';

describe('UpdatereferentielComponent', () => {
  let component: UpdatereferentielComponent;
  let fixture: ComponentFixture<UpdatereferentielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatereferentielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatereferentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
