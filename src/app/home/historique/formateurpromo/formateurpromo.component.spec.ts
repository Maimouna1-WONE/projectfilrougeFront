import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurpromoComponent } from './formateurpromo.component';

describe('FormateurpromoComponent', () => {
  let component: FormateurpromoComponent;
  let fixture: ComponentFixture<FormateurpromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormateurpromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormateurpromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
