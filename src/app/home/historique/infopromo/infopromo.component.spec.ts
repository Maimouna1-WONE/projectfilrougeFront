import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfopromoComponent } from './infopromo.component';

describe('InfopromoComponent', () => {
  let component: InfopromoComponent;
  let fixture: ComponentFixture<InfopromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfopromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfopromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
