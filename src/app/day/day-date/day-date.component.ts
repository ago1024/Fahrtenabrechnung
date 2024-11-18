import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

function pad(val: number): string {
  let result = '' + val;
  while (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

export function makeId(year: number, month: number, day: number): string {
  return year + '-' + pad(month + 1) + '-' + pad(day);
}

@Component({
  selector: 'app-day-date',
  templateUrl: './day-date.component.html',
  styleUrls: ['./day-date.component.css'],
  standalone: true,
  imports: [DatePipe]
})
export class DayDateComponent {

  readonly year = input.required<number>();

  readonly month = input.required<number>();

  readonly day = input.required<number>();

  readonly date = computed(() => new Date(this.year(), this.month(), this.day()));

}
