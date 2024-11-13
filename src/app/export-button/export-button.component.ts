import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.css'],
  standalone: true,
  imports: [MatButton, MatIcon]
})
export class ExportButtonComponent {
  private exportService = inject(ExportService);

  click(): void {
    this.exportService.exportData();
  }

}
