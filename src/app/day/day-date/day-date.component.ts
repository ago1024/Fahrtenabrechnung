import {MonthEditComponent} from '../../month/month-edit/month-edit.component';
import {Component, Input, Host, OnInit, OnChanges} from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-day-date',
  templateUrl: './day-date.component.html',
  styleUrls: ['./day-date.component.css'],
  standalone: true,
  imports: [DatePipe]
})
export class DayDateComponent {
  @Input()
  year: number;

  @Input()
  month: number;

  @Input()
  day: number;

  get id(): string {
    return this.parent.makeId(this.day);
  }

  get date(): Date {
    return new Date(this.year, this.month, this.day);
  }

  constructor( @Host() private parent: MonthEditComponent) {
  }

}
