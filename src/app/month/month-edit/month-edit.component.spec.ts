import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonthEditComponent } from './month-edit.component';

describe('MonthEditComponent', () => {
  let component: MonthEditComponent;
  let fixture: ComponentFixture<MonthEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
