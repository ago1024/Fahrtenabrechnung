import { WaypointService } from './services/waypoint.service';
import { Component } from '@angular/core';

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
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedMonth = 0;
  selectedYear = new Date().getFullYear();

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
  years = [
    2017,
    2018,
    2019
  ];

  constructor(public waypointService: WaypointService) {
    this.waypointService.load();
  }

}
