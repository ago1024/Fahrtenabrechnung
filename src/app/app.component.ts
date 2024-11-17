import { WaypointService } from './services/waypoint.service';
import { Component, inject } from '@angular/core';
import { ExportButtonComponent } from './export-button/export-button.component';
import { ImportComponent } from './import/import.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MonthEditComponent } from './month/month-edit/month-edit.component';
import { MonthDaysComponent } from './month/month-days/month-days.component';
import { MonthLocationsComponent } from './month/month-locations/month-locations.component';

class Month {
  value: number;
  title: string;

  constructor (value: number, title: string) {
    this.value = value;
    this.title = title;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatTabGroup,
    MatTab,
    ExportButtonComponent,
    ImportComponent,
    MonthEditComponent,
    MonthDaysComponent,
    MonthLocationsComponent,
  ]
})
export class AppComponent {
  waypointService = inject(WaypointService);

  selectedMonth: number;
  selectedYear: number;

  months = [
    new Month(0, 'Januar'),
    new Month(1, 'Februar'),
    new Month(2, 'März'),
    new Month(3, 'April'),
    new Month(4, 'Mai'),
    new Month(5, 'Juni'),
    new Month(6, 'Juli'),
    new Month(7, 'August'),
    new Month(8, 'September'),
    new Month(9, 'Oktober'),
    new Month(10, 'November'),
    new Month(11, 'Dezember'),
  ];

  years = Array.from((function*() {
    const lastYear = new Date().getFullYear();
    let year = 2017;
    while (year <= lastYear)
      yield year++;
  })());

  constructor() {
    this.waypointService.load();

    const now = new Date();
    let monthIndex = now.getMonth() - 1;
    let year = now.getFullYear();

    if (monthIndex < 0) {
      monthIndex += 12;
      year -= 1;
    }
    this.selectedMonth = monthIndex;
    this.selectedYear = year;
  }
}
