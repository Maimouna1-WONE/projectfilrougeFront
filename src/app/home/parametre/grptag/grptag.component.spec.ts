import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrptagComponent } from './grptag.component';

describe('GrptagComponent', () => {
  let component: GrptagComponent;
  let fixture: ComponentFixture<GrptagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrptagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrptagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
