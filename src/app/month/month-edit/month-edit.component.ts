import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, computed, inject, input } from '@angular/core';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { DayDateComponent } from '@app/day/day-date/day-date.component';
import { DayEditComponent } from '@app/day/day-edit/day-edit.component';
import { DayViewComponent } from '@app/day/day-view/day-view.component';

@Component({
  selector: 'app-month-edit',
  templateUrl: './month-edit.component.html',
  styleUrls: ['./month-edit.component.css'],
  standalone: true,
  imports: [MatAccordion, NgFor, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, DayDateComponent, MatExpansionPanelDescription, DayViewComponent, DayEditComponent]
})
export class MonthEditComponent {
  cd = inject(ChangeDetectorRef);


  readonly year = input.required<number>();
  readonly month = input.required<number>();

  readonly days = computed(() => this.updateDays(this.year(), this.month()));

  selected = 1;

  private updateDays(year: number, month: number): number[] {
    const days: number[] = [];
    if (year && month >= 0) {
      const stop = new Date(year, month + 1, 1);
      for (let i = 1; i <= 31; i++) {
        const current = new Date(year, month, i);
        if (current.getTime() >= stop.getTime()) {
          break;
        }
        days.push(i);
      }
    }
    return days;
  }

}
