import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailprofilComponent } from './detailprofil.component';

describe('DetailprofilComponent', () => {
  let component: DetailprofilComponent;
  let fixture: ComponentFixture<DetailprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailprofilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
