import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MonthEditComponent } from '@app/month/month-edit/month-edit.component';
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
      .overrideComponent(DayDateComponent, {
        add: {
          providers: [
            MonthEditComponent,
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayDateComponent);
    component = fixture.componentInstance;
    component.day = 28;
    component.month = 9;
    component.year = 2000;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
