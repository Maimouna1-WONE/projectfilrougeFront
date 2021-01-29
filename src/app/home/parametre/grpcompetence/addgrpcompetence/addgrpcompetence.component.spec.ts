import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgrpcompetenceComponent } from './addgrpcompetence.component';

describe('AddgrpcompetenceComponent', () => {
  let component: AddgrpcompetenceComponent;
  let fixture: ComponentFixture<AddgrpcompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgrpcompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgrpcompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
