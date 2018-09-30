import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthLocationsComponent } from './month-locations.component';

describe('MonthLocationsComponent', () => {
  let component: MonthLocationsComponent;
  let fixture: ComponentFixture<MonthLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
