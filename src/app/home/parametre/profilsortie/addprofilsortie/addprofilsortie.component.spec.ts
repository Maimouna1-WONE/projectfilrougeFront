import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprofilsortieComponent } from './addprofilsortie.component';

describe('AddprofilsortieComponent', () => {
  let component: AddprofilsortieComponent;
  let fixture: ComponentFixture<AddprofilsortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprofilsortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprofilsortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
