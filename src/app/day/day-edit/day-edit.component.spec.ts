import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayEditComponent } from './day-edit.component';

describe('DayEditComponent', () => {
  let component: DayEditComponent;
  let fixture: ComponentFixture<DayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
