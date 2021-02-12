import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecompetenceComponent } from './updatecompetence.component';

describe('UpdatecompetenceComponent', () => {
  let component: UpdatecompetenceComponent;
  let fixture: ComponentFixture<UpdatecompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
