import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdategrpcompetenceComponent } from './updategrpcompetence.component';

describe('UpdategrpcompetenceComponent', () => {
  let component: UpdategrpcompetenceComponent;
  let fixture: ComponentFixture<UpdategrpcompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdategrpcompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdategrpcompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
