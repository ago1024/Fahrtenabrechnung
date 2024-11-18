import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DayDateComponent } from './day-date.component';

import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
registerLocaleData(localeDE);

describe('DayDateComponent', () => {
  let component: DayDateComponent;
  let fixture: ComponentFixture<DayDateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DayDateComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayDateComponent);
    fixture.componentRef.setInput('day', 28);
    fixture.componentRef.setInput('month', 9);
    fixture.componentRef.setInput('year', 2000);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
