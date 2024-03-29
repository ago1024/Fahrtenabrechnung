import {Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';

@Component({
    selector: 'app-month-edit',
    templateUrl: './month-edit.component.html',
    styleUrls: ['./month-edit.component.css']
})
export class MonthEditComponent implements OnInit {

  private _year: number;
  private _month: number;

  private _days: any[];

  private _selected = 1;

  @Input()
  set year(year: number) {
    this._year = year;
    this.updateDays();
  }

  get year(): number {
    return this._year;
  }

  @Input()
  set month(month: number) {
    this._month = month;
    this.updateDays();
  }

  get month(): number {
    return this._month;
  }

  get days(): any[] {
    return this._days;
  }

  get selected(): number {
    return this._selected;
  }

  set selected(selected: number) {
    this._selected = selected;
  }

  updateDays() {
    const days = [];
    if (this._year && this._month >= 0) {
      const first = new Date(this._year, this._month, 1);
      const stop = new Date(this._year, this._month + 1, 1);
      for (let i = 1; i <= 31; i++) {
        const current = new Date(this._year, this._month, i);
        if (current.getTime() >= stop.getTime()) {
          break;
        }
        days.push(i);
      }
    }
    this._days = days;
  }

  constructor(public cd: ChangeDetectorRef) {}

  pad(val: number): string {
    let result = '' + val;
    while (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }

  public makeId(day: number): string {
    return this.year + '-' + this.pad(this.month + 1) + '-' + this.pad(day);
  }

  ngOnInit() {
  }

}
