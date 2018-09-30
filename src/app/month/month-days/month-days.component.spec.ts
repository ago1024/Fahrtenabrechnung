import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDaysComponent } from './month-days.component';

describe('MonthDaysComponent', () => {
  let component: MonthDaysComponent;
  let fixture: ComponentFixture<MonthDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
